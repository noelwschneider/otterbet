import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEntry(action) {
    try {
        const config = {
            headers: { 
                'Content-Type': 'application/json',
        },
            withCredentials: true,
            params: {}
        };

        config.params = action.payload
 
        const entryResponse = yield axios.get('/api/entries', config)
        const [entry] = entryResponse.data

        yield put({type: 'SET_ENTRY', payload: entry})

    } catch (error) {
        console.log('error in fetchEntry:', error)
    }
}

function* createEntry(action) {
    console.log('in createEntry saga', action.payload)
    const input = action.payload

    let entryQuery
    let contestQuery

    const today = new Date()
    const todayString = `${today.getUTCFullYear()}-${today.getUTCMonth()+1}-${today.getUTCDate()}`
    const timeNow = new Date().toUTCString()

    let contestID = input.user + '_' + timeNow

    
    if (input.type === 'defaultSandbox') {
        
        // default sandbox for new users
        contestQuery = {
            id: contestID,
            nfl: true,
            ncaa_fb: true,
            nba: true,
            wnba: true,
            ncaa_mbb: true,
            ncaa_wbb: true,
            mlb: true,
            nhl: true,
            epl: true,
            spreads: true,
            h2h: true,
            over_under: true,
            type: 'sandbox',
            contest_start: todayString,
            period_duration: '0 year 0 month 7 day',
            period_fund: 1000,
            max_users: 1,
            max_entries: 1
        }

        // default entry to use for new users
        entryQuery = {
            user_id: input.user,
            name: input.name,
            funds: input.funds,
            default_entry: true,
            contest_id: contestID 
        }  
    } else {
        //! Fill these with the corresponding payload values
        contestQuery = {}
        entryQuery = {}
    }

    // post into contests
    if (input.type === 'defaultSandbox' || input.type === 'sandbox') {
        console.log('in create sandbox contest if condition', contestQuery)
        // create new contest for this sandbox
        yield put({type: 'CREATE_CONTEST', payload: contestQuery})
    }
    
    // post new entry
    yield axios.post('/api/entries', entryQuery)
}

function* entriesSaga() {
    yield takeLatest('FETCH_ENTRY', fetchEntry);
    yield takeLatest('CREATE_ENTRY', createEntry);
  }
  
  export default entriesSaga;