import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import odds from './odds.reducer';
import scores from './scores.reducer'
import myBets from './myBets.reducer';
import markets from './markets.reducer';
import betslip from './betslip.reducer';
import entries from './entries.reducer';


const rootReducer = combineReducers({
  errors,
  user, 
  odds,
  scores,
  myBets,
  markets,
  betslip,
  entries,
});

export default rootReducer;
