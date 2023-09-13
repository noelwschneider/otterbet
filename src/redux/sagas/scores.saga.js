import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getScores() {

    console.log('in getScores saga')
    const config = {
        headers: { 
            'Content-Type': 'application/json',
    },
        withCredentials: true,
    };

    const response = yield axios.get('/api/scores/games/all', config)
    yield put({type: 'GET_SCORES', payload: response.data})
}

function* updateScores(action) {
    console.log('in updateScores:', action.payload)

    const {competition, date} = action.payload

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

    
    // ROUTER
    // - make score API request for a given competition/date
    // - compare games received to games in the database
    //    - end up with a list of games which have ended since the last update
    // - loop through the list of games
    //    - update markets for games which ended (result column)
    //       - *this will require separate logic for spreads, h2h, and over/under
    //       - update all wagers placed on this market and their relevant entries

    const response = yield(axios.get('/api/scores/games/update', config))
    console.log(response.data)
    
    
    
    // SAGA
    // - update global state where appropriate

    yield put({type: 'SET_TEST', payload: response.data})
}

function* postScores(action) {
    
    /* THIS IS AN ADMINISTRATIVE FUNCTION
    FOR ADDING NEW GAMES TO THE DATABASE -- 
    IT SHOULD ONLY BE USED WHEN THE SCHEDULE 
    IS RELEASED FOR AN UPCOMING SEASON, AND 
    SHOULD NOT EVER BE TRIGGERED AUTOMATICALLY 
    OR BY A USER ACTION*/

    console.log('in postScores', action.payload)

    try {
        action.payload.map( async(obj) => {

            //! This conditional does not include playoff games because my solution for making game ids did not work with teams listed as null
            if (obj.game.stage !== "Pre Season" && obj.teams.home.name !== null && obj.teams.away.name !== null ) {
                await axios.post('/api/scores/games/all', obj)
            }
            
        })
        // yield axios.post('/api/scores/', action.payload)
    } catch (error) {
        console.log('error in scores post', error)
    }
}


function* scoresSaga() {
    yield takeLatest('FETCH_SCORES', getScores)
    yield takeLatest('UPDATE_SCORES', updateScores)
    yield takeLatest('ADMIN_POST_SCORES', postScores)
}

export default scoresSaga