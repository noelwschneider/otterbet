// Components
import MarketsCol from './MarketsCol/MarketsCol';
import BetSlip from './BetSlip/BetSlip';

// Style
import { styles } from '../../styling/styles';
import { Grid } from '@mui/material';


export default function MarketsPage() {
  return (
    <Grid
      sx={styles.markets.container}
      container>

      <MarketsCol />
      <BetSlip />

    </Grid>
  )
}