import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchMyBets(action) {
    try {
        const config = {
            headers: { 
                'Content-Type': 'application/json',
        },
            withCredentials: true,
            params: action.payload
        };
        
        const getMyBets = yield axios.get('/api/bets', config);
        const myBetsData = getMyBets.data;

        yield put({type: 'SET_MYBETS', payload: myBetsData})

    } catch (error) {
        console.log('error in fetchMyBets:', error);
    }
}

function* myBetsSaga() {
    yield takeLatest('FETCH_MYBETS', fetchMyBets);
}

export default myBetsSaga;