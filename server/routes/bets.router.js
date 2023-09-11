// This router is for user bets

const express = require('express');
const axios = require('axios')

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {
    //! The below console log runs like 20 times on page load. Is that an issue?
    // console.log('in bets router GET:', req.query)

    const queryText = `
        SELECT
            bets.id AS "id",
            wager,
            outcome,
            market,
            point,
            price,
            games.id AS game_id,
            home,
            away,
            "date",
            "time",
            league
        FROM bets
        	JOIN markets
        		on markets.id = bets.market_id
            JOIN games
        		on games.id = markets.game_id
        WHERE user_id = $1
        ORDER BY 
            "date" ASC,
            "time" ASC,
            home ASC
        ;
    `

    const queryValues = [req.query.id]

    pool.query(queryText, queryValues)
    .then( response => {
        res.send(response.rows)
    })
    .catch( error => {
        console.log('error in bets get query:', error)
        res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
    req.body.map( wager => {
        console.log(wager)
        const queryText = `
            INSERT INTO bets (user_id, market_id, wager, bet_timestamp, entry_id)
            VALUES ($1, $2, $3, CURRENT_TIME AT TIME ZONE 'UTC', $4)
            ;
        `

        const queryValues = [wager.user, wager.id, wager.wager, wager.entry_id]

        pool.query(queryText, queryValues)
        .catch( error => {
            console.log('error in bets router post:', error)
        })
    })
    res.sendStatus(200)
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {wagerSum, entry} = req.body

    const queryText = `
        UPDATE entries 
        SET funds=funds-$1
        WHERE id = $2
        ;
    `

    const queryValues = [wagerSum, entry.id]

    pool.query(queryText, queryValues)
    .then( response => {
        res.sendStatus(200)
    })
    .catch( error => {
        console.log('error in bets router PUT:', error)
        res.sendStatus(500)
    })
})

module.exports = router;