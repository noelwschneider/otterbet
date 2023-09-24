const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('in entries router GET')
    console.log('req.user:', req.user)
    console.log('req.body:', req.body)
    console.log('req.params:', req.params)
    console.log('req.query:', req.query)
    

    // const {user} = req.query
    const user = JSON.parse(req.user.id)
    
    console.log('user in entry router GET:', user)
    const queryValues = [user]

    const sqlQuery =`
        SELECT *
        FROM entries
        WHERE 
            user_id = $1
        ORDER BY
            default_entry DESC NULLS LAST,
            "name" ASC
        ;
    `

    pool.query(sqlQuery, queryValues)
    .then( response => {
        // console.log('response.rows:', response.rows)
        res.send(response.rows)
    })
    .catch( error => {
        console.log('error in pool query:', error)
    }) 
})

router.post('/', (req, res) => {
    console.log('in entry router POST', req.body)

    const {name, funds, default_entry, user_id, contest_id} = req.body
    
    const queryText = `
        INSERT INTO entries ("name", funds, default_entry, user_id, contest_id)
        VALUES($1, $2, $3, $4, $5)
        ;
    `

    const queryValues = [name, funds, default_entry, user_id, contest_id]

    pool.query(queryText, queryValues)
    .then( response => {
        res.sendStatus(200)
    })
    .catch( error => {
        console.log('error in entries router post:', error)
        res.sendStatus(500)
    })
})

module.exports = router;