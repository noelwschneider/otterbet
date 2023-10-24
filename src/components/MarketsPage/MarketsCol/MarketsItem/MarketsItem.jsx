// Style Tools
import { styles } from '../../../../styling/styles';

// Style Components
import Grid from '@mui/material/Grid';

// Components
import MarketItemHeader from './Rows/MarketItemHeader';
import HomeRow from './Rows/HomeRow';
import AwayRow from './Rows/AwayRow';


function MarketsItem({ game }) {

  const { markets } = game

  // Add tags to each market for matching to table cell
  for (let market of markets) {
    market.tag = `${market.outcome}_${market.market}`
  }

  return (
    <Grid
      container spacing={0}
      item xs={12}
      sx={styles.markets.itemContainer}>

      <MarketItemHeader game={game} />
      <AwayRow game={game} />
      <HomeRow game={game} />

    </Grid>
  )
}

export default MarketsItem