const express = require('express');
const axios = require('axios')
const pool = require('../../modules/pool');
const router = express.Router();
const APIKey = process.env.SPORTS_API_KEY;
 
// Utilities
const {
    makeDateString,
    removeSpaces,
} = require('../../modules/utilities');

// Requests
const getGamesToUpdate = require('./requests/getGamesToUpdate');
const updateScores = require('./requests/updateScores');
const getLinesToUpdate = require('./requests/getLinesToUpdate');
const updateLines = require('./requests/updateLines');
const getWagersToUpdate = require('./requests/getWagersToUpdate');
const updateWagers = require('./requests/updateWagers');

// Get score updates from sports-api for live or recent games
router.get('/games/update', async (req, res) => {
    //! Refactor:
    //! Check database for dates w/ unresolved games
        //! Find last date updated
        //! Scan for games between last date updated and today
    //! Remove date from query parameters
        //! Always use Date.now() to get current date
    //! Write function to loop through below sequence for each date w/ unresolved game(s)
        //! Include optional arg for max queries (to prevent api overrun)

    let { competition, date } = req.query;
    date = makeDateString(date);
    const connection = await pool.connect();
    const config = {
        headers: {
            'x-apisports-key': APIKey
        }
    };
    try {
        await connection.query('BEGIN')

        const scoresFromApi = await axios.get(`https://v1.${competition}.api-sports.io/games?league=1&date=${date}`, config);
        const gamesToUpdate = await getGamesToUpdate(connection, scoresFromApi, competition, date);
        await updateScores(connection, gamesToUpdate, competition);
        const linesToUpdate = await getLinesToUpdate(gamesToUpdate);
        await updateLines(connection, linesToUpdate);
        const wagersToUpdate = await getWagersToUpdate(connection, linesToUpdate);
        await updateWagers(connection, wagersToUpdate);

        await connection.query('COMMIT');
        res.sendStatus(200)
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('error in connection:', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
})

// THIS IS ADMINISTRATIVE
// REQUESTING EVERY GAME CAN TAKE A LONG TIME
    // FUTURE GAMES SHOULD BE GOTTEN FROM THE DATABASE
    // LIVE GAMES SHOULD BE REQUESTED IN SMALLER BATCHES THAN THIS
// Get all games for a specified season
//! Is there a way to prevent this from being triggered by the user?
router.get('/games/all', (req, res) => {

    const config = {
        headers: {
            'x-apisports-key': APIKey
        }
    }

    axios.get('https://v1.american-football.api-sports.io/games?league=1&season=2023', config)
        .then( response => {

            const formattedResponse = response.data.response.map( game => {
                game.id = removeSpaces(`${game.league.name}_${game.teams.home.name}_${game.teams.away.name}_${game.game.date.date}_${game.game.date.time}`)
                return game
            })

            res.send(formattedResponse)
        })
        .catch( error => {
            console.log('error in scores GET:', error)
            res.sendStatus(500)
        })
})


/* THIS IS AN ADMINISTRATIVE TASK -- 
IT SHOULD NOT BE DONE REGULARLY AND
THE USER SHOULD NOT BE ABLE TO 
TRIGGER IT AT ALL */
// Add games to the database
router.post('/games/all', (req, res) => {

    let obj = req.body

    let queryText = `
        INSERT INTO games (
            "id",
            "date",
            "time",
            stage,
            league,
            season,
            status,
            timer,
            home,
            home_score,
            away,
            away_score,
            home_1q,
            home_2q,
            home_3q,
            home_4q,
            home_overtime,
            away_1q,
            away_2q,
            away_3q,
            away_4q,
            away_overtime,
            venue_city,
            venue_name
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
    `

    let queryValues = [
        obj.game.id, // id
        obj.game.date.date, // date
        obj.game.date.time, // time
        obj.game.stage, // stage
        obj.league.name, // league
        obj.league.season, // season
        obj.game.status.short, // status
        obj.game.status.timer, // timer
        obj.teams.home.name, // home
        obj.scores.home.total, // home_score
        obj.teams.away.name, // away
        obj.scores.away.total, // away_score
        obj.scores.home.quarter_1, 
        obj.scores.home.quarter_2,
        obj.scores.home.quarter_3,
        obj.scores.home.quarter_4,
        obj.scores.home.overtime,
        obj.scores.away.quarter_1,
        obj.scores.away.quarter_2,
        obj.scores.away.quarter_3,
        obj.scores.away.quarter_4,
        obj.scores.away.overtime,
        obj.game.venue.city, // venue_city
        obj.game.venue.name // venue_name
    ]

    pool.query(queryText, queryValues)
    .then( response => {
        res.sendStatus(200)
    })
    .catch( error => {
        console.log('error in pool query:', error)
        res.sendStatus(500)
    })
})

module.exports = router;