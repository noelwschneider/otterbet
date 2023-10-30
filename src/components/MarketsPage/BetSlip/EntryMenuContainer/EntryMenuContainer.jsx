import { useSelector } from 'react-redux';

// Components
import NoEntryMessage from './NoEntryMessage';
import EntryMenu from './EntryMenu/EntryMenu';

// Styling
import Grid from '@mui/material/Grid';


export default function EntryMenuContainer() {

  // Store variables
  const entry = useSelector(store => store.entry)

  return (
    <Grid item xs={12}>
      {entry.length === 0

        // Message to render if user has no entries
        ? <NoEntryMessage />

        // Menu of user entries
        : <EntryMenu />
      }
    </Grid>)
}
