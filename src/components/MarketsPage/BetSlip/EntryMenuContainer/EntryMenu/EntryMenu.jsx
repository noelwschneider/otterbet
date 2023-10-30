// Hooks
import { useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import EntryMenuDropdown from './EntryMenuDropdown';

// Style Tools
import { styles } from '../../../../../styling/styles'

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function EntryMenu() {

  const entry = useSelector(store => store.entry);

  // State
  const [selectedEntry, setSelectedEntry] = useState(0);

  return (
    <Grid container sx={styles.betslip.selectEntryMenu}>

      {/* Available funds display */}
      <Grid item xs={12} component={Typography} variant="h5">
        <strong>Available funds: </strong>
        ${Number(entry[selectedEntry].funds).toFixed(2)}
      </Grid>

      <EntryMenuDropdown />

    </Grid>
  )
}

export default EntryMenu