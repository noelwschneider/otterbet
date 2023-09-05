import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Saga for getting array of markets for each game
function* getMarketsArray() {
    try {
        //& I use this like 50 times, should I just put it somewhere else and import it?
        const config = {
            headers: { 
                'Content-Type': 'application/json',
        },
            withCredentials: true,
            params: {}
        };

        const gameIDsResponse = yield axios.get('/api/markets/game-IDs', config)
        //& This is sending up an array of JSON strings. I can work with that, but it is worth investigating if this is really the way to do this
        config.params = {gamesList: gameIDsResponse.data}

        const marketsList = yield axios.get('/api/markets', config)
        console.log(marketsList.data)

    } catch (error) {
        console.log('error in markets.saga:', error)
    }
}

function* marketsSaga() {
    yield takeLatest('FETCH_MARKETS', getMarketsArray)
}

export default marketsSaga