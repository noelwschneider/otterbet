

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Developer Components
import Palette from './Palette';

// Components
// import Markets from './Markets/Markets/MarketsCol';
// import BetSlip from './Markets/BetSlip/BetSlip';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function StylePlayground() {
    // This is the half of the Markets page that shows games to wager on
    
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: theme.palette.secondary.light
    }));

    return (<>
        {/* Palette demo */}
        <Palette />

        {/* THIS IS WHAT GETS COPIED TO THE ACTUAL COMPONENT */}
        <ComponentTheme container>  

        </ComponentTheme>
    </>)
}

export default StylePlayground