import React from 'react';
import { useSelector } from 'react-redux';

// Components
import NoEntryMessage from './NoEntryMessage';
import EntryMenu from './EntryMenu/EntryMenu';

// Style Tools
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';


function EntryMenuContainer() {

    // Store variables
    const entry = useSelector(store => store.entry)

    // Custom theming
    const ComponentTheme = styled('div')(({ theme }) => ({

    }));

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

export default EntryMenuContainer