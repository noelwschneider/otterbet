// This router deals with odds-api

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

//& This may be better off in its own file (esp if it may be useful when dealing with other requests from odds-api)
const fixTimestamp = timestamp => {
    let fixedTimestamp = []
    for (let character of timestamp) {
        if (character === 'T') {
            fixedTimestamp.push(' ')
        } else if (character !== 'Z') {
            fixedTimestamp.push(character)
        }
    }
    return fixedTimestamp.join('')
}

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
                        last_update: fixTimestamp(market.last_update)
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
            commence_time: fixTimestamp(game.commence_time),
            competition: game.sport_key
        }
        arrayToReturn.push(gameObj)
    }
    return arrayToReturn
}


// GET odds data from API request and send to the reducer
//! Add reject unauthenticated when this is working?
router.get('/update-odds', (req, res) => {

    //& The odds reducer may eventually include several variables that determine the specifics of this request
    //& bookmakers should eventually be replaced with regions
    axios.get(`https://api.the-odds-api.com/v4/sports/upcoming/odds/?sport=americanfootball_nfl&markets=h2h,spreads,totals&bookmakers=betmgm&apiKey=${oddsAPIKey}`)
        .then(response => {
            console.log('response:', response.data)

            //& The games array should have its own route -- it won't need to be updated all that frequently
            let marketsArray = makeMarketsArray(response.data)

            //* long term, I need a way to avoid redundant data (i.e. don't add a row to the database if there is already an identical row because nothing changed since the last update)

            res.send(marketsArray)
        })
        .catch(error => {
            console.log('error in odds router:', error)
        })
})

// POST odds from store to the database
router.post('/update-odds', (req, res) => {

    let queryText = `
        INSERT INTO markets (
            bookmaker, 
            game_id, 
            outcome, 
            market, 
            point, 
            price, 
            last_update
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `

    req.body.map( newMarket => {
        const { game_id, bookmaker, market, outcome, price, point, last_update } = newMarket
        let queryData = [bookmaker, game_id, outcome, market, point, price, last_update]

        pool.query(queryText, queryData)
        .then(response => {
            console.log('successfull market post:', queryData)
        })
        .catch(error => {
            console.log('error in pool query:', error)
            res.sendStatus(500)
        })
    })
    res.sendStatus(200)
})

// GET games list from odds-api
//& this may end up being removed entirely, with the /update-odds sending in a homemade game ID, and a similar game ID can be sent in the sports-api router
router.get('/update-games', (req, res) => {
    //& The odds reducer may eventually include several variables that determine the specifics of this request
    //& bookmakers should eventually be replaced with regions
    axios.get(`https://api.the-odds-api.com/v4/sports/upcoming/odds/?sport=americanfootball_nfl&markets=h2h,spreads,totals&bookmakers=betmgm&apiKey=${oddsAPIKey}`)
        .then(response => {
            console.log('response:', response.data)

            //& The games array should have its own route -- it won't need to be updated all that frequently
            let gamesArray = makeGamesArray(response.data)

            //* long term, I need a way to avoid redundant data (i.e. don't add a row to the database if there is already an identical row because nothing changed since the last update)

            res.send(gamesArray)
        })
        .catch(error => {
            console.log('error in odds router:', error)
        })
})

router.post('/games', (req, res) => {
    console.log('games post req:', req.body)

    let queryText = `
        INSERT INTO games (id, home_team, away_team, commence_time, competition)
        VALUES ($1, $2, $3, $4, $5)
    `

    req.body.map( game => {
        const {id, home_team, away_team, commence_time, competition} = game
        let queryData = [id, home_team, away_team, commence_time, competition]

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