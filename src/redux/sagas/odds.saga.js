import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateOdds() {
    try {
        console.log('in fetchOdds')
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/odds', config);
        console.log('response from server:', response.data)

        yield put({type: 'UPDATE_ODDS', payload: response.data})
    } catch (error) {
        console.log('error in odds.saga:', error)
    }
}

function* oddsSaga() {
    yield takeLatest('FETCH_ODDS', updateOdds)
}

export default oddsSaga;