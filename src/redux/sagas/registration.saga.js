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

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    console.log("in registerUser saga:", action.payload)
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // Get newly created user ID
    let postResponse = yield axios.post('/api/user/register', action.payload);
    console.log('value returned from registration post:', postResponse.data.id)

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

    // automatically log a user in after registration
    
    // Log in
    /*
    yield put({ type: 'LOGIN', payload: action.payload })
    */
    console.log('action.payload:', action)
    yield call(loginUser, action)
    
    // Create contest for default entry
    // yield put({ type: "CREATE_CONTEST", payload: defaultContest})

    yield call(createContest, defaultContest)
    
    // Create default entry
    // yield put({ type: "CREATE_ENTRY", payload: defaultEntry})

    yield call(createEntry, defaultEntry)

    // Fetch new entry
    //yield put({type: 'FETCH_ENTRY', payload: postResponse.data.id})

    yield call(fetchEntry, postResponse.data.id)

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
