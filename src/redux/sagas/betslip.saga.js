import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* submitWagers(action) {
    console.log('in submitWagers:', action.payload)
    try {        
        // Insert bets, update entry funds, get updated entries
        const test = yield axios.post('/api/bets/', action.payload)

        // update funds in reducer
        yield put({type: 'SET_ENTRY', payload: test.data.rows})

        // clear betslip
        yield put({type: 'CLEAR_BETSLIP'})
        
    } catch (error) {
        console.log('error in submitWagers', error)
    }
}

function* clearWagers(action) {
    console.log('in clear wagers')
}

function* betslipSaga() {
   yield takeLatest('SUBMIT_WAGERS', submitWagers)
   yield takeLatest('CLEAR_WAGERS', clearWagers)
}

export default betslipSaga