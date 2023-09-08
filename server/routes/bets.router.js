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
            home_team,
            away_team,
            commence_time,
            competition
        FROM bets
        	JOIN markets
        		on markets.id = bets.market_id
            JOIN games
        		on games.id = markets.game_id
        WHERE user_id = $1
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
        const queryText = `
            INSERT INTO bets (user_id, market_id, wager)
            VALUES ($1, $2, $3)
            ;
        `
        const queryValues = [wager.user, wager.id, wager.wager]

        pool.query(queryText, queryValues)
        .catch( error => {
            console.log('error in bets router post:', error)
        })
    })
    res.sendStatus(200)
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {wagerSum} = req.body

    const queryText = `
        UPDATE entries 
        SET funds=funds-$1
        WHERE user_id = $2
        ;
    `

    const queryValues = [wagerSum, id]

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