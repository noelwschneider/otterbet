import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//& This whole saga should be renamed -- right now it isn't clear from the name why it is any different from markets.saga, but its purpose is distinct: this one deals with the odds-api, where as markets.saga deals with what is already in the database

function* updateOdds(action) {
    const {startDate, endDate, sport} = action.payload
    console.log('action.payload:', action.payload)
    console.log('sport is:', sport)
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            params: {
                startDate,
                endDate,
                sport
            }
        };

        console.log('dates in odds saga:', startDate, endDate)

        // GET most recent data from odds-api
        const response = yield axios.get('/api/odds/update-odds', config);
        console.log('response from server:', response.data)

    } catch (error) {
        console.log('error in odds.saga:', error)
    }
}

function* getOdds(action) {
    console.log('in fetch odds saga')

    const {startDate, endDate} = action.payload
    try {
        const config = {
            headers: { 
                'Content-Type': 'application/json',
        },
            withCredentials: true,
            params: {
                startDate,
                endDate
            }
        };

        // GET list of game IDs from the database
        const gamesResponse = yield axios.get('/api/markets/game-IDs', config)
        //& This is sending up an array of JSON strings. I can work with that, but it is worth investigating if this is really the way to do this
        
        let games = gamesResponse.data 
        const gameIDs = games.map( game => {
            return game.id
        })
        console.log('game IDs:', gameIDs)
        config.params = {gamesList: gameIDs}
        console.log('game ID list response:', games)

        // GET markets for each game
        const marketsResponse = yield axios.get('/api/markets', config)
        const markets = marketsResponse.data 
        console.log('markets response:', markets)

        

        const convertToAmerican = price => {
            // console.log('price is:', price)
            let num = price - 1
            
            if (price >= 2) {
              num *= 100
              num = Math.round(num)
              num = `+${num}`
            }
            
            if (price < 2) {
              num = 1 / num
              num *= 100
              num = Math.round(num)
              num = `-${num}`
            }
            // console.log('num to return is:', num)
            return num
        }

        const matchGamesToMarkets = (games, markets) => {
            let arrayToReturn = []
            for (let game of games) {
                for (let market of markets) {
                    if (market[0].game_id === game.id) {
                        game.markets = market
                        arrayToReturn.push(game)
                        // console.log('if condition met:', game)
                    }
                }
                // console.log('game after loop:', game)
                
            }
            // console.log('games:', arrayToReturn)
            return arrayToReturn
        }

        games = yield matchGamesToMarkets(games, markets)

        for (let game of games) {
            // yield console.log(game)
            yield game.markets.map( market => {
                market.price = {
                    european: market.price,
                    american: convertToAmerican(market.price)
                }
            })
        }
        
        yield console.log('games with updated pricing:', games)

        yield put({type: 'SET_ODDS', payload: games})

    } catch (error) {
        console.log('error in markets.saga:', error)
    }
}

function* oddsSaga() {
    yield takeLatest('FETCH_ODDS', getOdds)
    yield takeLatest('UPDATE_ODDS', updateOdds)
}

export default oddsSaga;