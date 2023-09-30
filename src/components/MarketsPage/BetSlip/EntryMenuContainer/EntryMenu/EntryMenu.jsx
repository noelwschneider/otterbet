// Hooks
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import EntryMenuDropdown from './EntryMenuDropdown';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function EntryMenu() {

    const dispatch = useDispatch()

    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    // State
    const [selectedEntry, setSelectedEntry] = useState(0)

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        padding: "16px"
    }));

    return (
        <ComponentTheme container>

            {/* Available funds display */}
            <Grid item xs={12}>
                <span>
                    <Typography variant="h5">
                        <strong>Available funds: </strong>
                        ${Number(entry[selectedEntry].funds).toFixed(2)}
                    </Typography>
                </span>
            </Grid>

            <Grid item xs={12}>
                <EntryMenuDropdown />
            </Grid>

        </ComponentTheme>
    )
}

export default EntryMenu