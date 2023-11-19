// Components
import AvailableLines from './AvailableLines/AvailableLines';
import BetSlip from './BetSlip/BetSlip';

// Style
import { styles } from '../../styling/styles';
import { Grid } from '@mui/material';


export default function Lines() {
  return (
    <Grid
      sx={styles.markets.container}
      container>

      <AvailableLines />
      <BetSlip />

    </Grid>
  )
}