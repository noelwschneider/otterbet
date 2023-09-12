import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEntry(action) {
    try {
        console.log('payload in fetchEntry:', action.payload)
        const config = {
            headers: { 
                'Content-Type': 'application/json',
        },
            withCredentials: true,
            params: {}
        };

        const entryResponse = yield axios.get('/api/entries', config)
        console.log(entryResponse.data)
        const entry = entryResponse.data
        console.log('entry', entry)
        
        yield put({type: 'SET_ENTRY', payload: entry})
    } catch (error) {
        console.log('error in fetchEntry:', error)
    }
}

function* createEntry(action) {
    console.log('in createEntry saga', action.payload)
    
    // post new entry
    yield axios.post('/api/entries', action.payload)
    yield put({type: 'FETCH_ENTRY', payload: action.payload})
}

function* entriesSaga() {
    yield takeLatest('FETCH_ENTRY', fetchEntry);
    yield takeLatest('CREATE_ENTRY', createEntry);
  }
  
  export default entriesSaga;