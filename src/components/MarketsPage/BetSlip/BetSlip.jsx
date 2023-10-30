import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import BetSlipItemContainer from './BetSlipItem/BetSlipItemContainer';
import BetSlipAlerts from './BetSlipAlerts';
import EntryMenuContainer from './EntryMenuContainer/EntryMenuContainer';
import SubmitButton from './SubmitButton/SubmitButton';
import BetSlipHeader from './BetSlipHeader';

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';


function BetSlip() {
  const dispatch = useDispatch()

  const user = useSelector(store => store.user)

  useEffect(() => {
    dispatch({ type: 'FETCH_ENTRY', payload: user.id })
  }, []);

  return (
    <Grid container item xs={5} sx={styles.betslip.container} component={Card}>

      <BetSlipHeader />
      <BetSlipAlerts />
      <EntryMenuContainer />
      <BetSlipItemContainer />
      <SubmitButton />

    </Grid>)
}

export default BetSlip