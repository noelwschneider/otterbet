// Style Tools
import { styles } from '../../../../styling/styles';

// Style Components
import { Grid } from '@mui/material';

// Components
import Header from './Rows/Header';
import Row from './Rows/Row';


export default function Game({ game }) {
  const { markets, home, away } = game;

  // Add tags to each market for matching to table cell
  for (let market of markets) {
    market.tag = `${market.outcome}_${market.market}`;
  }

  return (
    <Grid
      container spacing={0}
      item xs={12}
      sx={styles.markets.itemContainer}>

      <Header game={game} />
      <Row game={game} team={away} totals="Over"/>
      <Row game={game} team={home} totals="Under"/>

    </Grid>
  )
}