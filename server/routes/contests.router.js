const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.post('/', (req, res) => {
    console.log('in contests router post', req.body)
    const {
        id,
        type,
        nfl,
        ncaa_fb,
        nba,
        wnba,
        ncaa_mbb,
        ncaa_wbb,
        mlb,
        nhl,
        epl,
        spreads,
        h2h,
        over_under,
        contest_start,
        period_duration,
        period_count,
        period_fund,
        max_users,
        max_entries
    } = req.body

    console.log(contest_start)


    const queryText = `
        INSERT INTO contests (
            id,
            type,
            nfl,
            ncaa_fb,
            nba,
            wnba,
            ncaa_mbb,
            ncaa_wbb,
            mlb,
            nhl,
            epl,
            spreads,
            h2h,
            over_under,
            contest_start,
            period_duration,
            period_count,
            period_fund,
            max_users,
            max_entries
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);
    `
    const queryValues = [
        id,
        type,
        nfl,
        ncaa_fb,
        nba,
        wnba,
        ncaa_mbb,
        ncaa_wbb,
        mlb,
        nhl,
        epl,
        spreads,
        h2h,
        over_under,
        contest_start,
        period_duration,
        period_count,
        period_fund,
        max_users,
        max_entries
    ]
    
    pool.query(queryText, queryValues)
    .then( response => {
        res.sendStatus(200)
    })
    .catch( error => {
        console.log('error in contest pool post:', error)
    })
})


module.exports = router;