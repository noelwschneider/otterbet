// Hooks
import useStore from '../../hooks/useStore';

// Routing
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

// Utilities
import noActiveBets from '../../utilities/noActiveBets';

// Style
import { styles } from '../../styling/styles';
import { Typography } from '@mui/material';


export default function NoActiveBetsMessage({props}) {
  const {
    selectedEntryIndex, 
    upcomingBetsView } = props;

  const userBets = useStore("myBets");
  const entries = useStore("entries");

  return (<>
    {noActiveBets(entries[selectedEntryIndex], userBets) && upcomingBetsView &&
      <div sx={styles.myBets.noActiveBetsMessage}>
        <Typography variant="h3">No active bets.</Typography>
        <Typography variant="h6">
          Head to <Link to="/markets">Markets</Link> to view available lines.
        </Typography>
      </div>}
  </>)
}