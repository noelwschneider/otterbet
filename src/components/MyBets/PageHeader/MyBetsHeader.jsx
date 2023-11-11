// Style
import { styles } from '../../../styling/styles';
import { Typography } from '@mui/material';


export default function MyBetsHeader() {
  return (
    <Typography variant="h2"
      sx={styles.myBets.headerText}>
      My Bets
    </Typography>
  )
}