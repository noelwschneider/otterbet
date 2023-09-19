const express = require('express');
const axios = require('axios')

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

const {
    removeSpaces,
    formattedResponse,
    makeDateString
} = require('../modules/helpers')

const APIKey = process.env.SPORTS_API_KEY

/*
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
*/


// Get games from database for a specified day
router.get('/' , (req, res) => {

})

// Get score updates from sports-api for live or recent games
router.get('/games/update', async (req, res) => {
    console.log('in games/update router', req.query)
    const {competition, date} = req.query
    
    const connection = await pool.connect()

    const config = {
        headers: {
            'x-apisports-key': APIKey
        }
    }

    // Get list of (potential) games to update from database
    const gamesToUpdateText = `
        SELECT 
            games."id",
            status,
            timer
        FROM "games"
            JOIN "competitions"
                on games.league = competitions.title
        WHERE
            competitions.sports_api_name = $1
            AND "status" <> 'FT'
            AND "status" <> 'AOT'
            AND "date" <= $2
        ;
    `
    const gamesToUpdateValues = [competition, makeDateString(date)]

    // Update the scores and status of games that have had changes
    //^ baseball and soccer need slightly different query text
    const getUpdateScoreText = competition => {
        switch (competition) {
            case 'american-football':
                return `
                UPDATE "games"
                SET
                    status = $1,
                    timer = $2,
                    home_score = $3,
                    home_1q = $4,
                    home_2q = $5,
                    home_3q = $6,
                    home_4q = $7,
                    home_overtime = $8,
                    away_score = $9,
                    away_1q = $10,
                    away_2q = $11,
                    away_3q = $12,
                    away_4q = $13,
                    away_overtime = $14
                WHERE id = $15
                ;
                `
                
            
            case 'baseball':
                return `
                UPDATE "games"
                SET
                    status = $1,
                    timer = $2,
                    home_score = $3,
                    home_inning_1 = $4
                    home_inning_2 = $5
                    home_inning_3 = $6
                    home_inning_4 = $7
                    home_inning_5 = $8
                    home_inning_6 = $9
                    home_inning_7 = $10
                    home_inning_8 = $11
                    home_inning_9 = $12
                    home_extra_innings = $13,
                    away_score = $14,
                    away_inning_1 = $15
                    away_inning_2 = $16
                    away_inning_3 = $17
                    away_inning_4 = $18
                    away_inning_5 = $19
                    away_inning_6 = $20
                    away_inning_7 = $21
                    away_inning_8 = $22
                    away_inning_9 = $23
                    away_extra_innings = $24,
                    away_overtime = $25
                WHERE id = $26
                ;
            `
        
            default:
                break;
        }
    }

    const getUpdateScoreValues = (competition, game) => {
        switch (competition) {
            case 'american-football':
                return [
                    game.status,
                    game.timer,
                    game.home_score,
                    game.home_1q,
                    game.home_2q,
                    game.home_3q,
                    game.home_4q,
                    game.home_overtime,
                    game.away_score,
                    game.away_1q,
                    game.away_2q,
                    game.away_3q,
                    game.away_4q,
                    game.away_overtime,
                    game.id 
                ]
            
            case 'baseball':
                switch (true) {
                    case game.home_extra_innings != null:
                        game.timer = 'Extra Innings'                        
                        break;
                
                    case game.away_extra_innings != null:
                        game.timer = 'Extra Innings'                        
                        break;

                    case game.home_inning_9 != null:
                        game.timer = 'Bottom 9'                        
                        break;

                    default:
                        break;
                }
                return [
                    game.status,
                    game.timer,
                    game.home_score,
                    game.home_inning_1,
                    game.home_inning_2,
                    game.home_inning_3,
                    game.home_inning_4,
                    game.home_inning_5,
                    game.home_inning_6,
                    game.home_inning_7,
                    game.home_inning_8,
                    game.home_inning_9,
                    game.home_extra_innings,
                    game.away_score,
                    game.home_inning_1,
                    game.home_inning_2,
                    game.home_inning_3,
                    game.home_inning_4,
                    game.home_inning_5,
                    game.home_inning_6,
                    game.home_inning_7,
                    game.home_inning_8,
                    game.home_inning_9,
                    game.home_extra_innings,
                    game.id 
                ]
        
            default:
                break;    
        }
    }

    const updateScoreText = getUpdateScoreText(competition)
    
    const updateMarketText = `
    UPDATE "markets"
    SET result =
    CASE -- OPEN A
    WHEN market = 'spreads'
        THEN CASE -- OPEN B
        WHEN outcome = $2
        	THEN CASE -- OPEN C
            	WHEN $4 + point < 0
                	THEN FALSE
                WHEN $4 + point > 0
                    THEN TRUE
                ELSE NULL
                END -- END C
        WHEN outcome = $3
        	THEN CASE -- OPEN D
            WHEN $5 + point < 0
            	THEN FALSE
            WHEN $5 + point > 0
                THEN TRUE
            ELSE NULL
            END -- END D
        END -- END B
    WHEN market = 'h2h'
        THEN CASE -- OPEN E
        WHEN outcome = $6
            THEN TRUE
        ELSE FALSE
        END -- END E
    WHEN market = 'totals'
        THEN CASE -- OPEN F
            WHEN outcome = 'Over'
            	THEN CASE -- OPEN G
        		WHEN point < $7
        			THEN TRUE
        		WHEN point > $7
        			THEN FALSE
        		WHEN point = $7
        			THEN NULL
        		END -- END G
            WHEN outcome = 'Under'
            	THEN CASE -- OPEN H
        		WHEN point > $7
        			THEN TRUE
        		WHEN point < $7
        			THEN FALSE
        		WHEN point = $7
        			THEN NULL
        		END -- END H
            END -- END F
    	END -- END A
    WHERE game_id = $1
;
    `
    /*
        1 - id
        2 - home_team
        3 - away_team
        4 - home_margin
        5 - away_margin
        6 - winning_team
        7 - total_score
    */

    // Query to get id and result for each changed wager with a payout
    const fetchWagersText = `
    SELECT 
        markets."id" AS market_id,
        bets."id" AS bets_id,
        entry_id,
        result,
        wager,
        price
    FROM markets
        JOIN bets
            on markets."id" = bets.market_id
    WHERE 
        markets.game_id = $1
        AND (
            result <> FALSE
            OR RESULT IS NULL
        )
    ;
    `

    
    // Query to update wagers
    const updateTrueEntriesText = `
        UPDATE entries
        SET funds = funds + (
            CAST($2 as numeric) * 
            CAST($3 as numeric)
        )
        WHERE "id" = $1
        ;
    `

    const updateNullEntriesText = `
        UPDATE entries
        SET funds = funds + CAST($2 as numeric)
        WHERE "id" = $1
        ;
    `
    // 1 - 
    // 2 - 
    // 3 - 
    // 4 - 

    try {
        await connection.query('BEGIN')

        // Request scores from api-sports
        console.log('making API request')
        const apiResponse = await axios.get(`https://v1.${competition}.api-sports.io/games?league=1&date=2023-09-18`, config)

        console.log('sports-api response:', apiResponse.data.response)
        
        // Format API response (namely, dates)
        // console.log('formatting API response')
        /*
        const formattedAPI = formattedResponse(apiResponse.data.response)
        console.log('formatted API:', formattedAPI)
        */

        // Creating a list of unfinished games on or before the given date
        console.log('getting list of games to update')
        const gamesToUpdate = await connection.query(gamesToUpdateText, gamesToUpdateValues)
        console.log('games to update:', gamesToUpdate.rows)

        // Creating an array of game data which has changed since the last database update
        console.log('creating array for game data')
        let updatedGames = []
        await Promise.all(gamesToUpdate.rows.map( game => {
            for (let response of apiResponse.data.response) {
                // console.log('response is:', response)
                console.log('response.id:', response.game.id)
                console.log('game.id:', game.id)
                // Find the matching game, then check if its status or timer are different
                    //^ The timer alone would be fine in most situations
                if (game.id === response.game.id && (game.status !== response.status || game.timer !== response.timer)) {
                    updatedGames.push({
                        id: game.id,
                        status: response.game.status.short,
                        timer: response.game.status.time,
                        home: response.teams.home.name,
                        home_score: response.scores.home.total,
                        home_1q: response.scores.home.quarter_1,
                        home_2q: response.scores.home.quarter_2,
                        home_3q: response.scores.home.quarter_3,
                        home_4q: response.scores.home.quarter_4,
                        home_overtime: response.scores.home.overtime,
                        away: response.teams.away.name,
                        away_score: response.scores.away.total,
                        away_1q: response.scores.away.quarter_1,
                        away_2q: response.scores.away.quarter_2,
                        away_3q: response.scores.away.quarter_3,
                        away_4q: response.scores.away.quarter_4,
                        away_overtime: response.scores.away.overtime,
                    })
                }
            }
        }))
        //! I think I might need a conditional to get out of this thing if updatedGames is empty
        //! Or maybe the transaction will take care of that for me!
        console.log('updated games:', updatedGames)
        // Updating games
        console.log('updating game data')
        await Promise.all(updatedGames.map( game => {
            const updateValues = getUpdateScoreValues(competition, game)
            connection.query(updateScoreText, updateValues)
        }))
        
        // Creating an array to update markets as needed
        console.log('Creating an array of markets to update')
        const marketResults = []
        await Promise.all(updatedGames.map( game => { 
            const findWinner = () => {
                if (game.home_score > game.away_score) {
                    return game.home
                } else if (game.home_score < game.away_score) {
                    return game.away 
                } else if (game.home_score === game.away_score) {
                    return 'PUSH'
                }
            }

            const market = {
                id: game.id,
                home: game.home,
                away: game.away,
                home_margin: game.home_score - game.away_score,
                away_margin: game.away_score - game.home_score,
                winning_team: findWinner(game),
                total: game.home_score + game.away_score
            }
            marketResults.push(market)
        }))

        // Updating markets
        console.log('updating markets')
        await Promise.all(marketResults.map( market => {
            const updateMarketValues = [
                market.id,
                market.home,
                market.away,
                market.home_margin,
                market.away_margin,
                market.winning_team,
                market.total
            ]
            connection.query(updateMarketText, updateMarketValues)
        }))

        // Getting list of wagers to update
        console.log('getting list of wagers to update')
        
        console.log('marketResults', marketResults)

        // Get list of wagers to update from the database
        const wagersToUpdate = await Promise.all( 
            marketResults.map( market => {
                const responseRow = connection.query(fetchWagersText, [market.id])
                // console.log('fetchWagersText:', fetchWagersText)
                console.log('game id:', market.id)
                return responseRow
            })
        )
        // console.log('array with all response rows:', wagersToUpdate)
        wagersToUpdate.map( wager => {

                console.log('wager row:', wager.rows)
            
        })

        const extractRows = [] 
        wagersToUpdate.map( wager => {
            if (wager.rows.length !== 0) {
                extractRows.push(wager.rows)
            }
        })
        console.log('extract rows:', extractRows)

        // Flattening array from previous query
        console.log('flattening array')
        const flattenArray = (arrayToFlatten) => {
            if (arrayToFlatten.length === 0) {
                return arrayToFlatten
            }
            
            let arrayToReturn = Promise.all(arrayToFlatten.reduce( (accumulator, currentValue) => {
                console.log('in reduce:',)
                console.log('accumulator:', accumulator)
                console.log('current value:', currentValue)

                

                return accumulator.concat(currentValue)
            }))
            return arrayToReturn
        }

        const mergedWagerArrays  = await flattenArray(extractRows)

        // Updating entries
        console.log('updating entries', mergedWagerArrays)
        
        await Promise.all(mergedWagerArrays.map( wager => {
            console.log('in final map', wager)
            
            const updateEntriesValues = [
                wager.entry_id,
                Number(wager.wager),
                Number(wager.price)
            ]

            console.log('updateEntriesValues:', updateEntriesValues)
            let updateEntriesText

            if (wager.result === true) {
                updateEntriesText = updateTrueEntriesText
                console.log('if met for TRUE:', updateTrueEntriesText)
            } else if (wager.result === null) {
                updateEntriesText = updateNullEntriesText
                console.log('if met for NULL:', updateNullEntriesText)
            }

            connection.query(updateEntriesText, updateEntriesValues)
        }))
        
        // End connection and send success status
        await connection.query('COMMIT')
        res.sendStatus(200)
    } catch (error) {
        await connection.query('ROLLBACK')
        console.log('error in connection:', error)
        res.sendStatus(500)
    } finally {
        connection.release()
    }

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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
    `

    let queryValues = [
        obj.game.id, // id
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