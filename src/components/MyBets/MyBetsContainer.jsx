// Hooks
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../hooks/useStore';

// Components
import MyBetsHeader from './PageHeader/MyBetsHeader';
import EntryMenu from './PageHeader/EntryMenu';
import AvailableFunds from './PageHeader/AvailableFunds';
import UpcomingBetsToggleMenu from './PageHeader/UpcomingBetsToggleMenu';
import NoActiveBetsMessage from './BetData/NoActiveBetsMessage';
import BetsContainer from './BetData/BetsContainer';

// Style
import { styles } from '../../styling/styles';
import { Grid } from '@mui/material';


export default function MyBetsContainer() {
  const dispatch = useDispatch();

  const user = useStore("user");
  const entries = useStore("entries");

  useEffect(() => {
    dispatch({ type: 'FETCH_ENTRY' });
    dispatch({ type: 'FETCH_MYBETS', payload: user });
  }, []);

  const [selectedEntryIndex, setSelectedEntryIndex] = useState(0);
  const [upcomingBetsView, setUpcomingBetsView] = useState(true);

  return (
    <Grid container item xs={3.5}
      sx={styles.myBets.container}>

      {entries.length !== 0 && <>
        <MyBetsHeader />
        <EntryMenu props={{
          selectedEntryIndex,
          setSelectedEntryIndex,
        }} />
        <AvailableFunds index={selectedEntryIndex} />
        <UpcomingBetsToggleMenu props={{ upcomingBetsView, setUpcomingBetsView }} />
        <NoActiveBetsMessage props={{ upcomingBetsView, selectedEntryIndex }} />
        <BetsContainer props={{ upcomingBetsView, selectedEntryIndex }} />
      </>}
      
    </Grid>
  )
}