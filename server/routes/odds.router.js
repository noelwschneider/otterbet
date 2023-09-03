const express = require('express');
const axios = require('axios')

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();
const oddsAPIKey = process.env.ODDS_API_KEY

//& This should live elsewhere and be required into this
function makeMarketsArray(apiData) {
    let arrayToReturn = []
    for (let game of apiData) {
        for (let bookmaker of game.bookmakers) {
            for (let market of bookmaker.markets) {
                for (let outcome of market.outcomes) {
                    let marketObj = {
                        game_id: game.id,
                        bookmaker: bookmaker.key,
                        market: market.key,
                        outcome: outcome.name,
                        price: outcome.price,
                        point: outcome.point,
                        last_update: market.last_update
                    }
                    arrayToReturn.push(marketObj)
                }
            }
        }
    }
    return arrayToReturn
}

//& This should live elsewhere and be required into this
function makeGamesArray(apiData) {
    let arrayToReturn = []
    for (let game of apiData) {
        let gameObj = {
            id: game.id,
            home_team: game.home_team,
            away_team: game.away_team,
            commence_time: game.commence_time,
            competition: game.sport_key
        }
        arrayToReturn.push(gameObj)
    }
    return arrayToReturn
}

// GET odds from database

// POST odds from store to the database
router.post('/', (req, res) => {

    console.log('odds post req:', req.body)
    let queryText = ``
    let queryData = []
    pool.query(queryText, queryData)
})
// GET odds data from API request and send to the reducer
//! Add reject unauthenticated when this is working?
router.get('/update', (req, res) => {

    //& The odds reducer may eventually include several variables that determine the specifics of this request
        //& bookmakers should eventually be replaced with regions
    axios.get(`https://api.the-odds-api.com/v4/sports/upcoming/odds/?sport=americanfootball_nfl&markets=h2h,spreads,totals&bookmakers=betmgm&apiKey=${oddsAPIKey}`)
    .then( response => {
        console.log('response:', response.data)

        let marketsArray = makeMarketsArray(response.data)
        let gamesArray = makeGamesArray(response.data)

        //* long term, I need a way to avoid redundant data (i.e. don't add a row to the database if there is already an identical row because nothing changed since the last update)

        let updateObject = {marketsArray, gamesArray}
        res.send(updateObject)
    })
    .catch( error => {
        console.log('error in odds router:', error)
    })
})

module.exports = router;