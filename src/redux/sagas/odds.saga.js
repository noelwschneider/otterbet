import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateOdds() {
    try {
        console.log('in fetchOdds')
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // GET most recent data from odds-api
        const response = yield axios.get('/api/odds/update-odds', config);
        console.log('response from server:', response.data)

        // Send updated odds data to the store
        yield put({type: 'UPDATE_ODDS', payload: response.data})

        // POST store data to the database
    } catch (error) {
        console.log('error in odds.saga:', error)
    }
}

function* postOdds(action) {
    console.log('in postOdds', action.payload)
    yield axios.post('/api/odds', action.payload)
}

function* updateGames() {
    try {
        console.log('in fetchGames')
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('/api/odds/update-games')
        yield put({type: 'UPDATE_GAMES', payload: response.data})
    } catch (error) {
        console.log('games response server')
    }
}

function* postGames(action) {
    console.log(action.payload)
    yield axios.post('/api/odds/games', action.payload)
}

function* oddsSaga() {
    yield takeLatest('FETCH_ODDS', updateOdds)
    yield takeLatest('POST_ODDS', postOdds)
    yield takeLatest('FETCH_GAMES', updateGames)
    yield takeLatest('POST_GAMES', postGames)
}

export default oddsSaga;