// Utilities
import { 
  convertToAmerican, 
  getBetPointsText, 
  formatTimestamp 
} from '../../../utilities/_utilities';

// Style Tools
import { styles } from '../../../styling/styles'

// Styling Components
import {
  Grid,
  Card,
  Typography,
} from '@mui/material';


export default function MyBetsItem(props) {
  const { bet, view } = props

  let {
    away,
    date,
    time,
    home,
    outcome,
    price,
    wager,
    result,
  } = bet
  price = { european: price, american: convertToAmerican(price) };

  const winStyle = () => {
    if (view) {
      return {
        fontWeight: "bold",
      }
    } else if (result === true) {
      return {
        color: "green",
        fontWeight: "bold"
      }
    } else if (result === false) {
      return {
        textDecoration: "line-through",
        fontStyle: "italic"
      }
    } else if (result === null) {
      return { fontWeight: "bold" }
    }
  }

  const loseStyle = () => {
    if (view) {
      return {
        fontWeight: "bold"
      }
    } else if (result === true) {
      return {
        textDecoration: "line-through",
        fontStyle: "italic"
      }
    } else if (result === false) {
      return {
        color: "red",
        fontWeight: "bold"
      }
    } else if (result === null) {
      return { fontWeight: "bold" }
    }
  }

  return (
    <Grid container component={Card} sx={styles.myBets.itemContainer}>

      <Typography variant="h6" sx={styles.myBets.itemOutcome}>
        {outcome} {getBetPointsText(bet)}
      </Typography>

      <Typography variant="subtitle1" sx={styles.myBets.itemGame}>
        {away} at {home}
      </Typography>

      <Typography variant="subtitle1" sx={styles.myBets.itemDate}>
        {formatTimestamp(date, time)}
      </Typography>

      <Typography variant="h6" sx={loseStyle}>
        Wager: ${Number(wager).toFixed(2)}
      </Typography>

      <Typography variant="h6" sx={winStyle}>
        Payout: ${(Number(wager) * (price.european)).toFixed(2)}
      </Typography>

    </Grid>
  )
}