// Hooks
import { useDispatch } from 'react-redux';
import useStore from '../../../../../hooks/useStore';
// Style Tools
import { styles } from '../../../../../styling/styles';

// Style Components
import { Grid } from '@mui/material';

// Utilities
const { 
    addToBetslip,
    getAvailableOddsCellText 
} = require('../../../../../utilities/_utilities');


export default function Row({ game, team, totals }) {
  const dispatch = useDispatch();
  const betslip = useStore("betslip");
  const user = useStore("user");
  const { markets } = game;

  const totalsPrefix = totals === 'Over' ? 'o' : 'u';
  
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
        {team}
      </Grid>

      {/* SPREAD */}
      <Grid
        container
        item xs={2}
        onClick={() => handleClick(team, 'spreads')}
        sx={styles.markets.marketOption}
      >
        {/* Point */}
        <Grid item xs={6}
          sx={styles.markets.marketOptionContents}>
          {getAvailableOddsCellText(markets, team, 'spreads').point}
        </Grid>

        {/* Price */}
        <Grid item xs={6}
          sx={styles.markets.marketOptionContents}>
          ({getAvailableOddsCellText(markets, team, 'spreads').price.american})
        </Grid>
      </Grid>

      {/* MONEYLINE*/}
      <Grid className="market-option"
        item xs={2}
        onClick={() => handleClick(team, 'h2h')}
        sx={styles.markets.marketOption}>
        {getAvailableOddsCellText(markets, team, 'h2h').price.american}
      </Grid>

      {/* O/U Under value */}
      <Grid className="market-option"
        item xs={2}
        container
        onClick={() => handleClick(totals, 'totals')}
        sx={styles.markets.marketOption}>
        {/* Point */}
        <Grid item xs={6} sx={styles.markets.marketOptionContents}>
          {totalsPrefix}{getAvailableOddsCellText(markets, totals, 'totals').point}
        </Grid>

        {/* Price */}
        <Grid item xs={6} sx={styles.markets.marketOptionContents}>
          ({getAvailableOddsCellText(markets, totals, 'totals').price.american})
        </Grid>
      </Grid>

    </Grid>
    )
}