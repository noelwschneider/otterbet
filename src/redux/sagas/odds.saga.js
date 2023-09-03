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
        const response = yield axios.get('/api/odds/update', config);
        console.log('response from server:', response.data)

        // Send updated odds data to the store
        yield put({type: 'UPDATE_ODDS', payload: response.data})

        // POST store data to the database
    } catch (error) {
        console.log('error in odds.saga:', error)
    }
}

function* postOdds(action) {
    console.log('in postOdds')
    yield axios.post('/api/odds', action.payload)
}

function* oddsSaga() {
    yield takeLatest('FETCH_ODDS', updateOdds)
    yield takeLatest('POST_ODDS', postOdds)
}

export default oddsSaga;