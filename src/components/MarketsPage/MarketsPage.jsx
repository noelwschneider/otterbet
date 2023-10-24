// Components
import MarketsCol from './MarketsCol/MarketsCol';
import BetSlip from './BetSlip/BetSlip';

// Style Tools
import { styled } from '@mui/system';
import { styles } from '../../styling/styles';

// Style Components
import Grid from '@mui/material/Grid';

function MarketsPage() {

  return (
    <Grid
      sx={styles.markets.container}
      container>

      <MarketsCol />

      <BetSlip />

    </Grid>
  )
}

export default MarketsPage