// Hooks
import { useDispatch, useSelector } from 'react-redux';
import useStore from '../../../../hooks/useStore';

// Components
import ItemInfoDropdown from './ItemInfo/ItemInfoDropdown';
import BetSlipForm from './BetSlipForm/BetSlipForm';

// Style
import { styles } from '../../../../styling/styles'
import { 
  Grid,
  Typography,
  IconButton,
  CardActions,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


export default function BetSlipItem(props) {
  const { bet } = props
  const {
    id,
    market,
    outcome,
    point,
    price
  } = bet

  const dispatch = useDispatch();
  const betslip = useStore("betslip");

  //& A slightly different version of this is used in MarketItem.jsx. Long-term plan is to modularize
  const getCellText = (market) => {

    if (market === 'h2h') {
      return price.american
    }

    let prefix = ''
    if (market === 'spreads') {
      prefix = '+'
    }

    //! I need to figure out what odds-api will give me for the point property if the line is 0 -- it will probably be a string, but could be 0
    let newPoint = point
    if (newPoint >= 0) {
      newPoint = `${prefix}${Number(newPoint).toFixed(1)}`
    } else if (newPoint < 0) {
      newPoint = `${Number(newPoint).toFixed(1)}`
    } else if (!newPoint) {
      newPoint = ''
    } else {
      console.log('some unforeseen value:', newPoint)
    }

    //& eventually let the user determine whether they prefer American or European odds format
    let cellString = `${newPoint}`

    return cellString
  }

  const cellText = getCellText(market)

  const deleteWager = () => {
    let newBetslip = []
    for (let wager of betslip) {
      if (id !== wager.id) {
        newBetslip.push(wager)
      }
    }
    dispatch({ type: 'DELETE_WAGER', payload: newBetslip })
  }

  return (
    <Grid container item xs={12} component={CardActions}>

      <Grid item xs={10} component={Typography} variant="h6">
        {outcome} {cellText}
      </Grid>

      <Grid item xs={2} component={IconButton} onClick={deleteWager}>
        <ClearIcon sx={styles.betslip.item.clearWagerIcon} />
      </Grid>

      <ItemInfoDropdown key={bet.id} bet={bet} />

      <BetSlipForm key={id} bet={bet} />

    </Grid>)
}