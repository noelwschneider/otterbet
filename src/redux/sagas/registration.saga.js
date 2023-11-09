import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';

import { loginUser } from './login.saga';
import { createContest } from './contests.saga';
import { createEntry, fetchEntry } from './entries.saga';

const makeDateString = (date) => {
  if (!date) {
      date = new Date()
  }
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}


function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // Get newly created user ID
    let postResponse = yield axios.post('/api/user/register', action.payload);

    const defaultEntry = {
      payload: {
        name: `${action.payload.username}'s first entry`,
        funds: 1000,
        default_entry: true,
        user_id: postResponse.data.id,
        contest_id: `${postResponse.data.id}_${new Date().toUTCString()}`
      }
    }

    const defaultContest = {
      payload: {
        contest_id: `${postResponse.data.id}_${new Date().toUTCString()}`,
        admin: postResponse.data.id,
        type: 'sandbox',
        contest_start: makeDateString()
      }
    }
    
    // Log in
    yield call(loginUser, action);
    
    // Create contest for default entry
    yield call(createContest, defaultContest);
    
    // Create default entry
    yield call(createEntry, defaultEntry);

    // Fetch new entry
    yield call(fetchEntry, postResponse.data.id);
    
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
