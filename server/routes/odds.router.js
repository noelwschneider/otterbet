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

function getDate(timestamp) {
    // console.log('timestamp to format:', timestamp)
    let string
    let dateArray = []
    
    if (typeof timestamp === 'object') {
        let year = timestamp.getUTCFullYear().toString()
        let month = (timestamp.getUTCMonth() + 1).toString()
        let day = timestamp.getUTCDate().toString()
        
        // Using padStart method to add leading zeroes where necessary
        string = `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`
        
    } else {
        for (let i = 0; i < 10; i++) {
            string = timestamp
            dateArray.push(string[i])
        }
        string = dateArray.join('')
    }
    
    // console.log('formatted timestamp:', string)
    return string
}

function getTime(timestamp) {
    let timeArray = []
    for (let i = 11; i < 16; i++) {
        timeArray.push(timestamp[i])
      }
      console.log(timeArray.join(''))
      return timeArray.join('')
}

//& This may be better off in its own file (esp if it may be useful when dealing with other requests from odds-api)
function fixTimestamp(timestamp) {
    // console.log('timestamp:', timestamp)
    let fixedTimestamp = []
    for (let character of timestamp) {
        if (character === 'T') {
            fixedTimestamp.push(' ')
        } else if (character !== 'Z') {
            fixedTimestamp.push(character)
        }
    }

    // I do this because the odds-api timestamp goes to milliseconds and the scores-api doesn't. I think my solution is clunky and could backfire eventually. It would be better to get the ids to match by using logic regarding the (identical) times these (different) timestamps represent
    fixedTimestamp = fixedTimestamp.slice(0, -3)
    // console.log(fixedTimestamp.join(''))
    return fixedTimestamp.join('')
}

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

//! DO NOT USE
//! The commence times from odds-api and api-sports do not reliably match each other
function makeGameID(response) {
    let {sport_title, home_team, away_team, commence_time} = response

    home_team = removeSpaces(home_team)
    away_team = removeSpaces(away_team)
    commence_time = fixTimestamp(commence_time)
    return removeSpaces(`${sport_title}_${home_team}_${away_team}_${commence_time}`)
}

//& This should live elsewhere and be required into this
function makeMarketsArray(apiData) {
    let arrayToReturn = []
    for (let game of apiData) {
        for (let bookmaker of game.bookmakers) {
            for (let market of bookmaker.markets) {
                for (let outcome of market.outcomes) {
                    let marketObj = {
                        sport_title: game.sport_title,
                        odds_api_game_id: game.id,
                        home_team: game.home_team,
                        away_team: game.away_team,
                        date: getDate(game.commence_time),
                        bookmaker: bookmaker.key,
                        market: market.key,
                        outcome: outcome.name,
                        price: outcome.price,
                        point: outcome.point,
                        last_update: fixTimestamp(market.last_update),
                        dupCheck: false,
                        dupTag: 0
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
            date: getDate(game.commence_time),
            time: getTime(game.commence_time),
            competition: game.sport_key,
            
        }
        arrayToReturn.push(gameObj)
    }
    return arrayToReturn
}

// GET Request for list of in-season sports
router.get('/in-season', (req, res) => {

})

router.get('/update-odds', async (req, res) => {
    // Format is 'YYYY-MM-DD'
    const {startDate, endDate, sport} = req.query
    const connection = await pool.connect()

    try {
        // Begin the database connection
        await connection.query('BEGIN')
        // console.log('update odds with:', req.query)
    
        // Get odds from odds-api
        //! use a variable for the sport
        const oddsResponse = await axios.get(`https://api.the-odds-api.com/v4/sports/upcoming/odds/?sport=${sport}&markets=h2h,spreads,totals&bookmakers=betmgm&apiKey=${oddsAPIKey}`)

        // Array to hold flattened odds object for each game
        let marketsArray = await makeMarketsArray(oddsResponse.data)

        // Get games to give markets an appropriate game ID
        const getGamesListText = `
            SELECT
                "id",
                "date",
                "time",
                league,
                home,
                away
            FROM "games"
            WHERE "date" BETWEEN 
                $1
                AND $2
            ORDER BY
                "date" ASC,
                "time" ASC
            ;
        `

        const getGamesListValues = [startDate, endDate]
        const gamesResponse = await connection.query(getGamesListText, getGamesListValues)
        //& this can be const, right?
        let gamesArray = gamesResponse.rows

        // Formatting dates to match marketsArray dates
        for (let game of gamesArray) {
            game.date = getDate(game.date)
            // console.log('formatted game date:', game.date)
            game.dupTag = 0
        }

        //& If MLB, scan for doubleheaders
        // Scan each array for league, home, away, and date
        // If more than one match for any scan, use order of game times to determine appropriate pairings
        // Update dup tags (first game = 1, second game = 2)
            // Update for both arrays so strings in the ID check will match

        // Apply game ID to each market
        for (let market of marketsArray) {
            let marketString = `${market.sport_title}_${market.home_team}_${market.away_team}_${market.date}_${market.dupTag}`

            for (let game of gamesArray) {
                let gameString = `${game.league}_${game.home}_${game.away}_${game.date}_${game.dupTag}`

                // console.log('MARKET:', marketString)
                // console.log('GAME:', gameString)
                if (marketString === gameString) {
                    // console.log('if condition met')
                    market.game_id = game.id
                }
            }
        }
        
        // Getting existing markets from database
        // Making array of markets to check against
        const oldMarketsQueryText = `
            SELECT
                "id",
                game_id,
                market,
                outcome,
                point,
                price
            FROM markets
            WHERE 
                game_id = $1
                AND outcome = $2
                AND market = $3
            ORDER BY last_update
            LIMIT 1
            ;
        `
        const oldMarkets = await Promise.all(marketsArray.map( market => {
            const oldMarketsQueryValues = [
                market.game_id,
                market.outcome,
                market.market
            ]
            const responseRow = connection.query(oldMarketsQueryText, oldMarketsQueryValues)
            return responseRow
        }))
        const extractRows = [] 
        oldMarkets.map( wager => {
            if (wager.rows.length !== 0) {
                extractRows.push(wager.rows)
            }
        })
        // console.log('extract rows:', extractRows)

        const marketsToSend = []
        for (let market of marketsArray) {
            let marketString = `${market.game_id}_${market.market}_${market.outcome}`

            market.marketString = marketString

            for (let row of extractRows) {
                let rowString = `${row[0].game_id}_${row[0].market}_${row[0].outcome}`

                // console.log('NEW TEST:')                

                const stringCheck = marketString === rowString
                const priceCheck = market.price !== Number(row[0].price)
                const pointCheck = market.point !== Number(row[0].point)
                const undefinedCheck = market.point !== undefined && Number(row[0].point) !== undefined

                if (stringCheck && (priceCheck || (pointCheck && undefinedCheck))) {
                   
                    if (stringCheck) {
                        console.log('string comparison evaluates true:')
                        console.log('market:', marketString)
                        console.log('row:   ', rowString)
                        console.log('\n')
                    } 
    
                    if (priceCheck) {
                        console.log('price evaluates true')
                        console.log('market:', market.price)
                        console.log('row:   ', Number(row[0].price))
                        console.log('\n')
                    }
                    
                    if (pointCheck) {
                        console.log('point evaluates true')
                        console.log('market:', market.point)
                        console.log('row:   ', Number(row[0].point))
                        console.log('\n')
                    }

                    if (undefinedCheck) {
                        console.log('undefined evaluates true')
                        console.log('market:', market.point)
                        console.log('row:   ', Number(row[0].point))
                        console.log('\n')
                    }


                    marketsToSend.push(market)
                }
                // console.log('------------')
                // console.log('\n')
            }
        }
        // console.log('marketsToSend:', marketsToSend)

        // Sending updated markets to the database
        const oddsQueryText = `
            INSERT INTO markets (
                bookmaker, 
                market_string,
                game_id, 
                outcome, 
                market, 
                point, 
                price, 
                last_update
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `
    
        await Promise.all(marketsToSend.map( market => {
            const oddsQueryValues = [
                market.bookmaker,
                market.marketString,
                market.game_id,
                market.outcome,
                market.market,
                market.point,
                market.price,
                market.last_update
            ]
            connection.query(oddsQueryText, oddsQueryValues)
        }))

        // End the database connection
        connection.query('COMMIT')

        // Checking execution speed
        
        
    } catch (error) {
        console.log('error in odds router get:', error)
    } finally {
        connection.release()
    }
})


module.exports = router;