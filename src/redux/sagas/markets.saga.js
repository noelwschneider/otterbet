import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Saga for getting array of markets for each game
function* getMarketsArray() {
    // console.log('in saga')

    try {
        //& I use this like 50 times, should I just put it somewhere else and import it?
        const config = {
            headers: { 
                'Content-Type': 'application/json',
        },
            withCredentials: true,
            params: {}
        };

        // GET list of game IDs from the database
        const gamesResponse = yield axios.get('/api/markets/game-IDs', config)
        //& This is sending up an array of JSON strings. I can work with that, but it is worth investigating if this is really the way to do this
        
        const games = gamesResponse.data 
        config.params = {gamesList: gamesResponse.data}
        // console.log('games response:', games)

        // GET markets for each game
        const marketsResponse = yield axios.get('/api/markets', config)
        const markets = marketsResponse.data 
        // console.log('markets response:', markets)

        for (let game of games) {
            for (let market of markets) {
                if (market[0].game_id === game.id) {
                    game.markets = market
                }
            }
        }
        // console.log('updated games:', games)

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

        for (let game of games) {
            game.markets.map( market => {
                market.price = {
                    european: market.price,
                    american: convertToAmerican(market.price)
                }
            })
        }
        // console.log(games)

        yield put({type: 'SET_MARKETS', payload: games})

    } catch (error) {
        console.log('error in markets.saga:', error)
    }
}

function* marketsSaga() {
    yield takeLatest('FETCH_MARKETS', getMarketsArray)
}

export default marketsSaga