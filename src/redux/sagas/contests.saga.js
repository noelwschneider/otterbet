import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

export function* createContest(action) {

    //& Is there a way to consolidate this and the contestData declaration? It's a lot of lines for a pretty simple thing.
    const {
        admin,
        contest_id,
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
        admin,
        id: contest_id,
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

    yield axios.post('/api/contests', contestData)
}

function* fetchContest(action) {
    
}

function* contestsSaga() {
    yield takeLatest('FETCH_CONTEST', fetchContest);
    yield takeLatest('CREATE_CONTEST', createContest);
  }
  
  export default contestsSaga;