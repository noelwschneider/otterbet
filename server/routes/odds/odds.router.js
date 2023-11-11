// This router deals with odds-api
const express = require('express');
const router = express.Router();
const pool = require('../../modules/pool');

// Request functions
const getOddsFromApi = require('./requests/getOddsFromApi');
const addOddsToDatabase = require('./requests/addOddsToDatabase');
const getGamesFromDatabase = require('./requests/getGamesFromDatabase');
const getOddsFromDatabase = require('./requests/getOddsFromDatabase');

router.get('/update-odds', async (req, res) => {
    // Format is 'YYYY-MM-DD'
    const {startDate, endDate, sport} = req.query;
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const oddsFromApi = await getOddsFromApi(sport);
        const gamesFromDatabase = await getGamesFromDatabase(connection, startDate, endDate);

        //& If MLB, scan for doubleheaders
        // Scan each array for league, home, away, and date
        // If more than one match for any scan, use order of game times to determine appropriate pairings
        // Update dup tags (first game = 1, second game = 2)
            // Update for both arrays so strings in the ID check will match

        // Apply game ID to each market
        for (let line of oddsFromApi) {
            let lineString = `${line.sport_title}_${line.home_team}_${line.away_team}_${line.date}_${line.dupTag}`;
            for (let game of gamesFromDatabase) {
                let gameString = `${game.league}_${game.home}_${game.away}_${game.date}_${game.dupTag}`;
                if (lineString === gameString) {
                    line.game_id = game.id;
                }
            }
        }
        
        const oddsFromDatabase = await getOddsFromDatabase(connection, oddsFromApi);
        await addOddsToDatabase(connection, oddsFromDatabase, oddsFromApi);
        connection.query('COMMIT');
    } catch (error) {
        console.log('error in odds router get:', error)
        res.sendStatus(500)
    } finally {
        connection.release();
        res.sendStatus(200);
    }
})


module.exports = router;