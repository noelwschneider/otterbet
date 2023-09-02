import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchOdds() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/odds', config);

        yield put({type: 'SET_ODDS', payload: response.data})
    } catch (error) {
        console.log('error in odds.saga:', error)
    }
}

function* oddsSaga() {
    yield takeLatest('FETCH_ODDS', fetchOdds)
}

export default oddsSaga;