import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function NoEntryMessage() {

    return (<>
        <Typography variant="h5">You don't have any entries!</Typography>
        <Typography variant="h5">
            <Link to="/create-entry">Create a sandbox</Link> or <Link>join a contest</Link> to get started!
        </Typography>
    </>)
}

export default NoEntryMessage