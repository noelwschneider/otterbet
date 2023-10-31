// Hooks
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../hooks/useStore';

// Routing
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

// Components
import MyBetsItem from './MyBetsItem';
import EntryMenu from './EntryMenu';

// Utilities
import isFinished from '../../utilities/isFinished';

// Style Tools
import { styles } from '../../styling/styles';

// Styling
import {
  Grid,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
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

  

  const [selectedEntry, setSelectedEntry] = useState([]);
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(0);
  const [upcomingBetsView, setUpcomingBetsView] = useState(true);

  const countBetsToRender = () => {
    let count = 0;
    for (let bet of userBets) {
      if (bet.entry_id === entries[selectedEntryIndex].id
        && upcomingBetsView === !isFinished(bet)) {
        count++
      }
    }
    return count
  }

  let noActiveBets = countBetsToRender() === 0 && upcomingBetsView

  console.log('selected entry:', selectedEntry);
  console.log('index:', selectedEntryIndex);

  return (
    <Grid container
      sx={styles.myBets.container}>

      {entries.length !== 0 &&

        <Grid item xs={3.5}
          sx={styles.myBets.headerContainer}>

          <Typography variant="h2"
            sx={styles.myBets.headerText}>
            My Bets
          </Typography>

          <EntryMenu props={{ selectedEntryIndex,  setSelectedEntryIndex,
          setSelectedEntry }} />

          <span>
            <Typography variant="h5"
              sx={styles.myBets.availableFundsText}>
              <strong>Available funds: </strong>
              ${Number(entries[selectedEntryIndex].funds).toFixed(2)}
            </Typography>
          </span>

          <ToggleButtonGroup
            value={upcomingBetsView}
            exclusive
            onChange={(_, newValue) => setUpcomingBetsView(newValue)}
            sx={styles.myBets.betsViewToggleContainer}
          >
            <ToggleButton value={true}
              style={upcomingBetsView
                ? styles.myBets.activeViewToggle
                : styles.myBets.inactiveViewToggle
              }>
              <Typography variant="h6" >
                Upcoming
              </Typography>
            </ToggleButton>

            <ToggleButton value={false}
              style={upcomingBetsView
                ? styles.myBets.inactiveViewToggle
                : styles.myBets.activeViewToggle}>
              <Typography variant="h6" >
                Completed
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>

          {noActiveBets &&
            <div sx={styles.myBets.noActiveBetsMessage}>
              <Typography variant="h3">No active bets.</Typography>
              <Typography variant="h6">
                Head to <Link to="/markets">Markets</Link> to view available lines.
              </Typography>
            </div>}

          {userBets.map(bet => {
            return (
              (bet.entry_id === entries[selectedEntryIndex].id
                && upcomingBetsView === !(bet.status === 'FT' || bet.status === 'AOT'))
              && <MyBetsItem key={bet.id} view={upcomingBetsView} bet={bet} />
            )
          })}
        </Grid>
      }
    </Grid>
  )
}