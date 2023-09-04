import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getScores() {

    console.log(process.env.SPORTS_API_KEY)
    const config = {
        headers: { 
            'Content-Type': 'application/json',
    },
        withCredentials: true,
    };

    const response = yield axios.get('/api/sports', config)
    yield put({type: 'GET_SCORES', payload: response.data})
}

function* scoresSaga() {
    yield takeLatest('FETCH_SCORES', getScores)
}

export default scoresSaga