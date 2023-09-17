import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Developer Components
import Palette from '../_StylePlayground/Palette';

// Components
import MarketsCol from './MarketsCol/MarketsCol';
import BetSlip from './BetSlip/BetSlip';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function MarketsPage() {
    // This is the half of the Markets page that shows games to wager on
    
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: theme.palette.secondary.light
    }));

    return (
        <ComponentTheme container>  

            <MarketsCol />

            <BetSlip />
            
        </ComponentTheme>
    )
}

export default MarketsPage