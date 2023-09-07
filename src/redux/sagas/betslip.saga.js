import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* submitWagers(action) {
    console.log('in submitWagers', action.payload)
}

function* betslipSaga() {
   yield takeLatest('SUBMIT_WAGERS', submitWagers) 
}

export default betslipSaga