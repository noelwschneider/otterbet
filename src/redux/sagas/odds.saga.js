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

        // Send updated odds data to the store
        yield put({type: 'UPDATE_ODDS', payload: response.data})

        // POST store data to the database
    } catch (error) {
        console.log('error in odds.saga:', error)
    }
}

//& consolidate this into updateOdds saga?
function* postOdds(action) {
    try {
        console.log('in postOdds', action.payload)
        yield axios.post('/api/odds/update-odds', action.payload)
    } catch (error) {
        console.log('error in odds post', error)
    }
}



function* oddsSaga() {
    yield takeLatest('FETCH_ODDS', updateOdds)
    yield takeLatest('POST_ODDS', postOdds)
}

export default oddsSaga;