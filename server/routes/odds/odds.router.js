// This router deals with odds-api
const express = require('express');
const router = express.Router();
const pool = require('../../modules/pool');

// Request functions
const getOddsFromApi = require('./requests/getOddsFromApi');
const addOddsToDatabase = require('./requests/addOddsToDatabase');
const getGamesFromDatabase = require('./requests/getGamesFromDatabase');
const getOddsFromDatabase = require('./requests/getOddsFromDatabase');

// GET lines for each game
router.get('/', async (req, res) => {
    //& As is, this arrives as a JSON object. There might be a way to avoid the JSON.parse() by sending it up differently.
    const gamesList = req.query.gamesList.map(game => JSON.parse(game))

    let markets = []
    markets = await Promise.all(gamesList.map(async (game) => {
        const queryValue = game
        const queryText = `
            SELECT *
            FROM markets
            WHERE game_id = $1
            ORDER BY last_update DESC
            LIMIT 6;
        `;
        const response = await pool.query(queryText, [queryValue]);
        return response.rows;
    }))

    const removeEmptyArrays = arrayToEmpty => {
        const unemptyArray = []
        for (let i = arrayToEmpty.length - 1; i >= 0; i--) {
            if (arrayToEmpty[i].length != 0) {
                unemptyArray.push(arrayToEmpty[i])
            }
        }
        unemptyArray.reverse()
        return unemptyArray
    }
    const arrayToSend = await Promise.all(removeEmptyArrays(markets))
    res.send(arrayToSend)
})

// GET list of game IDs from database
router.get('/game-IDs', (req, res) => {
    const { startDate, endDate } = req.query

    // get IDs from Games
    //& timestamps in the WHERE sections should be variables later
    const gameIDsQuery = `
        SELECT 
            "id",
            away,
            date,
            time,
            league,
            home
        FROM games
        WHERE "date" BETWEEN 
            $1
            AND $2
            AND status <> 'FT'
            AND status <> 'AOT'
        ORDER BY 
            "date" ASC,
            "time" ASC,
            home ASC
        ;`

    const queryValues = [startDate, endDate]
    // GET list of game IDs from database
    pool.query(gameIDsQuery, queryValues)
        .then(response => {
            res.send(response.rows)
        })

    // get all Markets rows that match each game ID
    // put each set of markets into an object
    // send back an array of those objects
})

// POST odds from API to database
router.post('/update-odds', async (req, res) => {
    // Format is 'YYYY-MM-DD'
    const { startDate, endDate, sport } = req.query;
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