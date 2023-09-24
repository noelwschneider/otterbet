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

        const entryResponse = yield axios.get('/api/entries', config);
        const entry = entryResponse.data;
        
        yield put({type: 'SET_ENTRY', payload: entry});
    } catch (error) {
        console.log('error in fetchEntry:', error);
    }
}

export function* createEntry(action) {
    // post new entry
    yield axios.post('/api/entries', action.payload);
}

function* deleteEntry(action) {
    console.log('in deleteEntry', action.payload);
}

function* entriesSaga() {
    yield takeLatest('FETCH_ENTRY', fetchEntry);
    yield takeLatest('CREATE_ENTRY', createEntry);
    yield takeLatest('DELETE_ENTRY', deleteEntry);
  }
  
  export default entriesSaga;