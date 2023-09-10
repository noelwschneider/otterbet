import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createContest(action) {
    console.log('in createContest', action.payload)
    yield axios.post('/api/contests', action.payload)
}

function* fetchContest(action) {
    
}

function* contestsSaga() {
    yield takeLatest('FETCH_CONTEST', fetchContest);
    yield takeLatest('CREATE_CONTEST', createContest);
  }
  
  export default contestsSaga;