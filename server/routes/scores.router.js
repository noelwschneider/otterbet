const express = require('express');
const axios = require('axios')

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

const APIKey = process.env.SPORTS_API_KEY

function removeSpaces(string) {
    let unspaced = []
    for (let character of string) {
        if (character == ' ') {
            unspaced.push('_')
        } else {
            unspaced.push(character)
        }
    }
    return unspaced.join('')
}

router.get('/', (req, res) => {
    console.log(APIKey)
    // req.headers['x-apisports-key'] = APIKey

    const config = {
        headers: {
            'x-apisports-key': APIKey
        }
    }

    console.log(req.headers)

    axios.get('https://v1.american-football.api-sports.io/games?league=1&season=2023', config)
        .then( response => {
            // console.log('response:', response.data.response)

            const formattedResponse = response.data.response.map( game => {
                console.log('GAME AT CURRENT ITERATION:', game)
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
router.post('/', (req, res) => {
    console.log('games post req:', req.body)

    //! do I need code to prevent a bunch of identical scores in the event that a schedule comes out before the previous season is finished?
    let queryText = `
        INSERT INTO games (
            "id",
            api_sports_id,
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
    `

    req.body.map( game => {
        const {id, home_team, away_team, commence_time, competition} = game //! of course change this
        let queryData = [id, home_team, away_team, commence_time, competition] //! and this

        pool.query(queryText, queryData)
        .then( response => {
            console.log('successful game post', queryData)
        })
        .catch( error => {
            console.log('error in pool query:', error)
            res.sendStatus(500)
        })
    })

    res.sendStatus(200)
    // const [test] = req.body
    // const {id, home_team, away_team, commence_time, competition} = test
    
})
module.exports = router;