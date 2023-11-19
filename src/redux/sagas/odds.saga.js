import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Utilities
const { 
    addAmericanPrice,
    matchGamesToMarkets 
} = require('../../utilities/_utilities');

function* updateOdds(action) {
    const {startDate, endDate, sport} = action.payload;
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            params: {
                startDate,
                endDate,
                sport
            }
        };
        yield axios.post('/api/odds/update-odds', config);
    } catch (error) {
        console.log('error in odds.saga:', error);
    }
}

function* getOdds(action) {
    const {startDate, endDate} = action.payload
    try {
        const config = {
            headers: { 
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            params: {
                startDate,
                endDate
            }
        };

        // GET list of game IDs from the database
        const gamesResponse = yield axios.get('/api/odds/game-IDs', config);
        let games = gamesResponse.data;
        const gameIDs = games.map( game => {
            return game.id;
        });
        config.params.gamesList = gameIDs;

        // GET markets for each game
        const marketsResponse = yield axios.get('/api/odds', config);
        const markets = marketsResponse.data;

        games = yield matchGamesToMarkets(games, markets)
        games = addAmericanPrice(games);
        
        yield put({type: 'SET_ODDS', payload: games});
    } catch (error) {
        console.log('error in odds.saga:', error);
    }
}

function* oddsSaga() {
    yield takeLatest('FETCH_ODDS', getOdds)
    yield takeLatest('UPDATE_ODDS', updateOdds)
}

export default oddsSaga;