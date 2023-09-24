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
    
    const {startDate, endDate} = req.query

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
    .then( response => {
        res.send(response.rows)
    })

    // get all Markets rows that match each game ID
    // put each set of markets into an object
    // send back an array of those objects
})

// GET all markets for each game
router.get('/', async (req, res) => {

    //& As is, this arrives as a JSON object. There might be a way to avoid the JSON.parse() by sending it up differently.
    const gamesList = req.query.gamesList.map(game => JSON.parse(game))

    let markets = []
    markets = await Promise.all(gamesList.map( async (game) => {
        const queryValue = game

        const queryText = `
        SELECT
        *
    FROM 
        markets
    WHERE game_id = $1
    ORDER BY last_update DESC
    LIMIT 6
    ;
        `

        const response = await pool.query(queryText, [queryValue]) 
        return response.rows    
    }))

    const removeEmptyArrays = arrayToEmpty => {
        
        const unemptyArray = []
        for (let i = arrayToEmpty.length-1; i >= 0; i--) {
            if(arrayToEmpty[i].length != 0) {
                unemptyArray.push(arrayToEmpty[i])
            }
        }
        unemptyArray.reverse()
        return unemptyArray
    }
    const arrayToSend = await Promise.all(removeEmptyArrays(markets))
    res.send(arrayToSend)
})

module.exports = router;