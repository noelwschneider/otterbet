import { put, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';
import userReducer from '../reducers/user.reducer';

// worker Saga: will be fired on "LOGIN" actions
export function* loginUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // Clear any existing error on the login page
    yield put({ type: 'CLEAR_LOGIN_ERROR' });

    // Log in the user
    yield axios.post('/api/user/login', action.payload, config);

    // Get the user information from the server
    yield put({ type: 'FETCH_USER' });

  } catch (error) {

    console.log('Error with user login:', error);
    if (error.response.status === 401) {
      // if the username and password don't match in the database
      yield put({ type: 'LOGIN_FAILED' });
    } else {
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'LOGIN_FAILED_NO_CODE' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // end the session
    yield axios.post('/api/user/logout', config);

    // remove the client-side user object
    yield put({ type: 'UNSET_USER' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;
