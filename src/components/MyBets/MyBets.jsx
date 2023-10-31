// Hooks
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../hooks/useStore';

// Routing
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

// Components
import MyBetsHeader from './MyBetsHeader';
import MyBetsItem from './MyBetsItem';
import EntryMenu from './EntryMenu';
import AvailableFunds from './AvailableFunds';
import UpcomingBetsToggleMenu from './UpcomingBetsToggleMenu';
import NoActiveBetsMessage from './NoActiveBetsMessage';
import BetsContainer from './BetsContainer';

// Utilities
import noActiveBets from '../../utilities/noActiveBets';
import isFinished from '../../utilities/isFinished';

// Style
import { styles } from '../../styling/styles';
import {
  Grid,
  Typography,
} from '@mui/material';


export default function MyBets() {
  const dispatch = useDispatch();

  const user = useStore("user");
  const userBets = useStore("myBets");
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