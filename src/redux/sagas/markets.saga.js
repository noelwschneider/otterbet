import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Saga for getting array of markets for each game
function* getMarketsArray(action) {

    const {startDate, endDate} = action.payload;

    try {
        //& I use this like 50 times, should I just put it somewhere else and import it?
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
        const gamesResponse = yield axios.get('/api/markets/game-IDs', config);
        const games = gamesResponse.data ;
        config.params = {gamesList: gamesResponse.data};

        // GET markets for each game
        const marketsResponse = yield axios.get('/api/markets', config);
        const markets = marketsResponse.data;

        for (let game of games) {
            for (let market of markets) {
                if (market[0].game_id === game.id) {
                    game.markets = market;
                }
            }
        }

        const convertToAmerican = price => {
            let num = price - 1;
            
            if (price >= 2) {
              num *= 100;
              num = Math.round(num);
              num = `+${num}`;
            }
            
            if (price < 2) {
              num = 1 / num;
              num *= 100;
              num = Math.round(num);
              num = `-${num}`;
            }
            return num;
        }

        for (let game of games) {
            game.markets.map( market => {
                market.price = {
                    european: market.price,
                    american: convertToAmerican(market.price)
                }
            })
        }

        yield put({type: 'SET_MARKETS', payload: games});

    } catch (error) {
        console.log('error in markets.saga:', error);
    }
}

function* marketsSaga() {
    yield takeLatest('FETCH_MARKETS', getMarketsArray);
}

export default marketsSaga;