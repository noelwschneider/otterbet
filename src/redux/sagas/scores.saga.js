import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getScores() {
    const config = {
        headers: { 
            'Content-Type': 'application/json',
    },
        withCredentials: true,
    };

    const response = yield axios.get('/api/scores/games/all', config);
    yield put({type: 'GET_SCORES', payload: response.data});
}

function* updateScores(action) {
    const {competition, date} = action.payload;

    const config = {
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        params: {
            competition,
            date
        }
    };

    const response = yield(axios.get('/api/scores/games/update', config)); 
    //& Review sequence to see if I should be updating store after this request
}

function* postScores(action) {
    
    /* THIS IS AN ADMINISTRATIVE FUNCTION
    FOR ADDING NEW GAMES TO THE DATABASE -- 
    IT SHOULD ONLY BE USED WHEN THE SCHEDULE 
    IS RELEASED FOR AN UPCOMING SEASON, AND 
    SHOULD NOT EVER BE TRIGGERED AUTOMATICALLY 
    OR BY A USER ACTION */

    try {
        action.payload.map( async(obj) => {

            //! This conditional does not include playoff games because my solution for making game ids did not work with teams listed as null
            if (obj.game.stage !== "Pre Season" && obj.teams.home.name !== null && obj.teams.away.name !== null ) {
                await axios.post('/api/scores/games/all', obj);
            }
            
        })
    } catch (error) {
        console.log('error in scores post', error);
    }
}


function* scoresSaga() {
    yield takeLatest('FETCH_SCORES', getScores)
    yield takeLatest('UPDATE_SCORES', updateScores)
    yield takeLatest('ADMIN_POST_SCORES', postScores)
}

export default scoresSaga