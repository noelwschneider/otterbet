// Style
import { 
  Grid, 
  Typography,
  CardHeader,
} from '@mui/material';


export default function BetSlipHeader() {
  return (
    <Grid
      item xs={12}
      component={CardHeader}
      title={
        <Typography variant="h2">
          Bet Slip
        </Typography>}
    />
  )
}