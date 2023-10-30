// Hooks
import useStore from '../../../../hooks/useStore';

// Comonents
import BetSlipItem from './BetSlipItem';

// Style Components
import {
  Grid,
  CardActionArea,
} from '@mui/material';


export default function BetSlipItemContainer() {
  const betslip = useStore("betslip");

  return (
    <Grid container item xs={12} component={CardActionArea} disableRipple>

      {betslip.map(bet => (
        <BetSlipItem key={bet.id} bet={bet} />
      ))}

    </Grid>)
}