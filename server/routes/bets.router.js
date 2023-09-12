// This router is for user bets

const express = require('express');

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

router.post('/', async (req, res) => {

    const {betslip, user, entry, wagerSum} = req.body

    const connection = await pool.connect()

    const postText = `
        INSERT INTO bets (user_id, market_id, wager, bet_timestamp, entry_id)
        VALUES ($1, $2, $3, CURRENT_TIME AT TIME ZONE 'UTC', $4)
        ;
    `
    
    //! Note: it seems to be working, but mind that 
    //! they usual url syntax for put routes ends 
    //! with /:id. I think that is just to let us
    //! access the id through req.params earlier on,
    //! but I should watch for possible side effects
    const putText = `
        UPDATE entries 
        SET funds=funds-$1
        WHERE id = $2
        ;
    `
    const putValues = [wagerSum, entry.id]

    const getText = `
        SELECT *
        FROM entries
        WHERE 
            user_id = $1
        ORDER BY
            default_entry DESC NULLS LAST,
            "name" ASC
        ;
    `
    const getValues = [user.id]

    try {
        await connection.query('BEGIN')

        // Insert each new bet into the bet table
        await betslip.map( wager => { 
            console.log('current wager is:', wager)
            
            const postValues = [wager.user, wager.id, wager.wager, wager.entry_id]
            connection.query(postText, postValues)
        })

        // Subtract wagered funds from entry
        await connection.query(putText, putValues)

        // Get updated entries from database
        const queryResponse = await connection.query(getText, getValues)

        await connection.query('COMMIT')
        res.send(queryResponse)
    } catch (error) {
        console.log('catch triggered', error)
        await connection.query('ROLLBACK')
        res.sendStatus(500)
    } finally {
        connection.release()
    }
})

module.exports = router;