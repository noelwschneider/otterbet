// Hooks
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { styles } from '../../../../../styling/styles';

// Style Components
import { Grid } from '@mui/material';

// Utilities
const { 
    addToBetslip,
    getAvailableOddsCellText 
} = require('../../../../../utilities/_utilities');


export default function HomeRow({ game }) {
  const dispatch = useDispatch();
  const betslip = useSelector(store => store.betslip);
  const user = useSelector(store => store.user);

  const { home, markets } = game;

  const handleClick = (outcome, market) => {
    const newBet = addToBetslip(user, betslip, game, outcome, market);
    if (newBet) {
        dispatch({ type: 'SET_BETSLIP', payload: newBet});
    }
  }

  return (
    <Grid
      container item
      sx={styles.markets.itemRow} >

      {/* TEAM */}
      <Grid
        item xs={6}
        sx={styles.markets.teamName}>
        {home}
      </Grid>

      {/* SPREAD */}
      <Grid
        container
        item xs={2}
        onClick={() => handleClick(home, 'spreads')}
        sx={styles.markets.marketOption}
      >
        {/* Point */}
        <Grid item xs={6}
          sx={styles.markets.marketOptionContents}>
          {getAvailableOddsCellText(markets, home, 'spreads').point}
        </Grid>

        {/* Price */}
        <Grid item xs={6}
          sx={styles.markets.marketOptionContents}>
          ({getAvailableOddsCellText(markets, home, 'spreads').price.american})
        </Grid>
      </Grid>

      {/* MONEYLINE*/}
      <Grid className="market-option"
        item xs={2}
        onClick={() => handleClick(home, 'h2h')}
        sx={styles.markets.marketOption}>
        {getAvailableOddsCellText(markets, home, 'h2h')}
      </Grid>

      {/* O/U Under value */}
      <Grid className="market-option"
        item xs={2}
        container
        onClick={() => handleClick('Under', 'totals')}
        sx={styles.markets.marketOption}>
        {/* Point */}
        <Grid item xs={6} sx={styles.markets.marketOptionContents}>
          u{getAvailableOddsCellText(markets, 'Under', 'totals').point}
        </Grid>

        {/* Price */}
        <Grid item xs={6} sx={styles.markets.marketOptionContents}>
          ({getAvailableOddsCellText(markets, 'Under', 'totals').price.american})
        </Grid>
      </Grid>

    </Grid>
    )
}