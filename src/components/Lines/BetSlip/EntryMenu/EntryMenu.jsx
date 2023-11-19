// Hooks
import useStore from '../../../../hooks/useStore';

// Components
import EntryMenuDropdown from './EntryMenuDropdown';

// Style Tools
import { styles } from '../../../../styling/styles'

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function EntryMenu({ props }) {
    const entries = useStore("entries");
    const { entry, setEntryIndex } = props;

    return (
        <Grid container sx={styles.betslip.selectEntryMenu}>

            {/* Available funds display */}
            <Grid item xs={12} component={Typography} variant="h5">
                Available funds: ${Number(entry.funds).toFixed(2)}
            </Grid>

            <EntryMenuDropdown props={{ entry, setEntryIndex }} />

        </Grid>
    )
}

export default EntryMenu