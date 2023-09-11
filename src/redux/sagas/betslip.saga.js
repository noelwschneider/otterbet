import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* submitWagers(action) {
    try {
        const {betslip, wagerSum, user, entry} = action.payload

        // send bets to database
        yield axios.post('/api/bets', betslip)

        // update user funds in database
        yield axios.put(`/api/bets/${user.id}`, {wagerSum})

        // update funds in reducer
        const entryObject = {user: {id: user.id}, entryQuery: entry.id}
        yield put({type: 'FETCH_ENTRY', payload: entryObject})

        // clear betslip
        yield put({type: 'CLEAR_BETSLIP'})
        
    } catch (error) {

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