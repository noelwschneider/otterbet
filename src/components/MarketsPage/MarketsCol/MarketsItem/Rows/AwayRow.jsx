// Hooks
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { styles } from '../../../../../styling/styles';

// Style Components
import Grid from '@mui/material/Grid';

// Utilities
const { 
    addToBetslip,
    getAvailableOddsCellText 
} = require('../../../../../utilities/_utilities');

export default function AwayRow({ game }) {
  const dispatch = useDispatch();
  const betslip = useSelector(store => store.betslip);
  const user = useSelector(store => store.user);

  const { away, markets } = game;

  const handleClick = (outcome, market) => {
    const newBet = addToBetslip(user, betslip, game, outcome, market);
    dispatch({ type: 'SET_BETSLIP', payload: newBet});
  }

  return (
    <Grid
      container item
      sx={styles.markets.itemRow} >

      {/* TEAM */}
      <Grid
        item xs={6}
        sx={styles.markets.teamName}>
        {away}
      </Grid>

      {/* SPREAD */}
      <Grid
        container
        item xs={2}
        onClick={() => handleClick(away, 'spreads')}
        sx={styles.markets.marketOption}
      >
        {/* Point */}
        <Grid item xs={6}
          sx={styles.markets.marketOptionContents}>
          {getAvailableOddsCellText(markets, away, 'spreads').point}
        </Grid>

        {/* Price */}
        <Grid item xs={6}
          sx={styles.markets.marketOptionContents}>
          ({getAvailableOddsCellText(markets, away, 'spreads').price.american})
        </Grid>
      </Grid>

      {/* MONEYLINE*/}
      <Grid className="market-option"
        item xs={2}
        onClick={() => handleClick(away, 'h2h')}
        sx={styles.markets.marketOption}>
        {getAvailableOddsCellText(markets, away, 'h2h')}
      </Grid>

      {/* O/U Over value */}
      <Grid className="market-option"
        item xs={2}
        container
        onClick={() => handleClick('Over', 'totals')}
        sx={styles.markets.marketOption}>
        {/* Point */}
        <Grid item xs={6} sx={styles.markets.marketOptionContents}>
          o{getAvailableOddsCellText(markets, 'Over', 'totals').point}
        </Grid>

        {/* Price */}
        <Grid item xs={6} sx={styles.markets.marketOptionContents}>
          ({getAvailableOddsCellText(markets, 'Over', 'totals').price.american})
        </Grid>
      </Grid>

    </Grid>
  )
}