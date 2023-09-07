// This router deals with market data already in the database

const express = require('express');
const axios = require('axios')

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


// GET list of game IDs from database
router.get('/game-IDs', (req, res) => {

    // console.log('in /markets/game-IDs GET')
    // get IDs from Games

    //& timestamps in the WHERE sections should be variables later
    const gameIDsQuery = `
    SELECT * 
    FROM games
    WHERE commence_time BETWEEN 
        timestamp '2023-09-08' 
        AND timestamp '2023-09-15'
    ;`
    
    // GET list of game IDs from database
    pool.query(gameIDsQuery)
    .then( response => {
        // console.log('database response:', response.rows)
        res.send(response.rows)
    })

    // get all Markets rows that match each game ID
    // put each set of markets into an object
    // send back an array of those objects
})

// GET all markets for each game
router.get('/', async (req, res) => {
    // console.log('in /markets GET')
    // console.log('req.query:', req.query)

    //& As is, this arrives as a JSON object. There might be a way to avoid the JSON.parse() by sending it up differently.
    const gamesList = req.query.gamesList.map(game => JSON.parse(game))
    // console.log('game list:', gamesList)



    const markets = await Promise.all(gamesList.map( async (game) => {
        const queryValue = [game.id]
        // console.log('query value:', queryValue)

        const queryText = `
            SELECT
                *
            FROM 
                markets
            WHERE game_id = $1
        `

        const response = await pool.query(queryText, queryValue) 
        // console.log('response from DB:', response.rows)
        return response.rows
        })
    )
    // console.log('markets:', markets)
    res.send(markets)
})

module.exports = router;