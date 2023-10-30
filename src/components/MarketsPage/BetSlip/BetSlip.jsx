// Hooks
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../../hooks/useStore';

// Components
import BetSlipItemContainer from './BetSlipItem/BetSlipItemContainer';
import BetSlipAlerts from './BetSlipAlerts';
import EntryMenuContainer from './EntryMenuContainer/EntryMenuContainer';
import SubmitButton from './SubmitButton/SubmitButton';
import BetSlipHeader from './BetSlipHeader';

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import {
  Grid,
  Card,
} from '@mui/material';


export default function BetSlip() {
  const dispatch = useDispatch()

  const user = useStore("user");

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