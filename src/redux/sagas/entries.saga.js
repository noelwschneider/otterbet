import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchEntry(action) {
    try {
        const config = {
            headers: { 
                'Content-Type': 'application/json',
        },
            withCredentials: true,
            params: {
                user: action.payload
            }
        };

        console.log('fetchEntry params:', config.params)
        const entryResponse = yield axios.get('/api/entries', config)
        console.log('response from fetchEntry GET request', entryResponse.data)
        const entry = entryResponse.data
        console.log('entry', entry)
        
        yield put({type: 'SET_ENTRY', payload: entry})
    } catch (error) {
        console.log('error in fetchEntry:', error)
    }
}

export function* createEntry(action) {
    console.log('in createEntry saga', action.payload)
    
    // post new entry
    yield axios.post('/api/entries', action.payload)
}

function* deleteEntry(action) {
    // Why is this getting logged every time I refresh a page?
    yield console.log('in deleteEntry', action.payload)
}

function* entriesSaga() {
    yield takeLatest('FETCH_ENTRY', fetchEntry);
    yield takeLatest('CREATE_ENTRY', createEntry);
    yield deleteEntry('DELETE_ENTRY', deleteEntry)
  }
  
  export default entriesSaga;