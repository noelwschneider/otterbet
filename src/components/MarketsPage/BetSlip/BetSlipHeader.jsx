import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

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