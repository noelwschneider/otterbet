import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function NoEntryMessage() {

    // Custom theming
    const theme = useTheme()
        //! CHANGE TO APPROPRIOATE COMPONENT
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        
    }));

    return (<>
        <Typography variant="h5">You don't have any entries!</Typography>
        <Typography variant="h5">
            <Link to="/create-entry">Create a sandbox</Link> or <Link>join a contest</Link> to get started!
        </Typography>
    </>)
}

export default NoEntryMessage