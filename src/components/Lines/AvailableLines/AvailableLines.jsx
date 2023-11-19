// Hooks
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../../hooks/useStore';

// Components
import Game from './Game/Game';
// import Container as Game from './Game/Container';

// Style Tools
import { styles } from '../../../styling/styles';

// Style Components
import {
  Grid,
  Typography,
} from '@mui/material';


export default function AvailableLines() {
  const dispatch = useDispatch();
  const lines = useStore("odds");

  //& Static dates for development purposes. Refactor into dynamic feature
  const [startDate, setStartDate] = useState('2023-11-12');
  const [endDate, setEndDate] = useState('2023-11-14');
  const [anchorEl, setAnchorEl] = useState(null);

  const dateRange = {
    startDate,
    endDate
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_ODDS', payload: dateRange });
  }, []);

  return (
    <Grid container spacing={0} item xs={7} sx={styles.markets.col}>

      <Grid item xs={2}
        component={Typography}
        variant="h2"
        style={styles.markets.header}>
        NFL
      </Grid>

      {lines.map(game => (
        <Game key={game.id} game={game} />
      ))}

    </Grid>
  )
}