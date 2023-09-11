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

// Get games from database for a specified day
router.get('/' , (req, res) => {

})

// Get score updates from sports-api for live or recent games
router.get('/games/update', (req, res) => {
    // logic:
    // - query database for dates of games where:
    //   - commence time is today or earlier
    //   - status is not complete
    //   ? This will likely occur in the saga, I'm thinking

    // THIS IS THE PART THAT IS HAPPENING IN THIS REQUEST
    // - query api-sports for each date returned in the above query

    // - use a PUT route to update
})

// THIS IS ADMINISTRATIVE
// REQUESTING EVERY GAME CAN TAKE A LONG TIME
    // FUTURE GAMES SHOULD BE GOTTEN FROM THE DATABASE
    // LIVE GAMES SHOULD BE REQUESTED IN SMALLER BATCHES THAN THIS
// Get all games for a specified season
router.get('/games/all', (req, res) => {
    console.log(APIKey)
    // req.headers['x-apisports-key'] = APIKey

    const config = {
        headers: {
            'x-apisports-key': APIKey
        }
    }

    // console.log(req.headers)

    axios.get('https://v1.american-football.api-sports.io/games?league=1&season=2023', config)
        .then( response => {
            // console.log('response:', response.data.response)

            const formattedResponse = response.data.response.map( game => {
                // console.log('GAME AT CURRENT ITERATION:', game)
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
    console.log('games post req:', req.body)

    let obj = req.body

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

    let queryValues = [
        obj.id, // id
        obj.game.id, // api_sports_id
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
        // console.log('successful game post', queryValues)
    })
    .catch( error => {
        console.log('error in pool query:', error)
        res.sendStatus(500)
    })
    console.log('scores games post success!')
    res.sendStatus(200)
})

module.exports = router;