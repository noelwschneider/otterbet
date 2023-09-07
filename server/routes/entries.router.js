const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('in entries router GET', req.query)
    const user = JSON.parse(req.query.user)
    const entryID = JSON.parse(req.query.entryQuery)
    console.log('user:', user)
    console.log('entryID:', entryID)

    const queryValues = entryID === 0
        ? [user.id]
        : [user.id, entryID]

    let sqlQuery = entryID === 0 
        ? `
            SELECT *
            FROM entries
            WHERE 
                user_id = $1
                AND default_entry = true
            ;
        ` 
        : `
        SELECT *
            FROM entries
            WHERE 
                user_id = $1
                AND default_entry = $2
            ;
        `
    console.log('sqlQUery is:', sqlQuery)

    pool.query(sqlQuery, queryValues)
    .then( response => {
        console.log(response.rows)
        res.send(response.rows)
    })
    .catch( error => {
        console.log('error in pool query:', error)
    })
    
} )

module.exports = router;