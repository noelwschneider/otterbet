import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEntry(action) {
    try {
        const config = {
            headers: { 
                'Content-Type': 'application/json',
        },
            withCredentials: true,
            params: {}
        };

        config.params = action.payload
 
        const entryResponse = yield axios.get('/api/entries', config)
        const [entry] = entryResponse.data

        yield put({type: 'SET_ENTRY', payload: entry})

    } catch (error) {
        console.log('error in fetchEntry:', error)
    }
}

function* createEntry(action) {
    console.log('in createEntry')
}

function* entriesSaga() {
    yield takeLatest('FETCH_ENTRY', fetchEntry);
    yield takeLatest('CREATE_ENTRY', createEntry);
  }
  
  export default entriesSaga;