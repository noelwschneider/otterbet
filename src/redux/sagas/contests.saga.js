import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createContest(action) {
    console.log('in createContest', action.payload)
    const {
        id,
        type,
        contest_start,
        period_duration,
        period_fund,
        period_count,
        max_users,
        min_wager,
        nfl,
        ncaa_fb,
        nba,
        wnba,
        ncaa_mbb,
        ncaa_wbb,
        mlb,
        nhl,
        epl,
        spreads,
        h2h,
        over_under } = action.payload
    
    
    const contestData = {
        id,
        type,
        nfl,
        ncaa_fb,
        nba,
        wnba,
        ncaa_mbb,
        ncaa_wbb,
        mlb,
        nhl,
        epl,
        spreads,
        h2h,
        over_under,
        contest_start,
        period_duration,
        period_count,
        period_fund,
        max_users,
        min_wager
    }
    console.log('contest data:', contestData)

    yield axios.post('/api/contests', contestData)
}

function* fetchContest(action) {
    
}

function* contestsSaga() {
    yield takeLatest('FETCH_CONTEST', fetchContest);
    yield takeLatest('CREATE_CONTEST', createContest);
  }
  
  export default contestsSaga;