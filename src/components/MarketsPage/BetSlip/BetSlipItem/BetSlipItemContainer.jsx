import { useSelector } from 'react-redux';

// Comonents
import BetSlipItem from './BetSlipItem';

// Style Components
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';


export default function BetSlipItemContainer() {
  const betslip = useSelector(store => store.betslip)

  return (
    <Grid container item xs={12} component={CardActionArea} disableRipple>

      {betslip.map(bet => (
        <BetSlipItem key={bet.id} bet={bet} />
      ))}

    </Grid>)
}