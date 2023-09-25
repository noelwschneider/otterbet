import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

// Comonents
import BetSlipItem from './BetSlipItem';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';


function BetSlipItemContainer() {

    const betslip = useSelector(store => store.betslip)

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        /* 
            Though currently unused, I am leaving this 
            styling component in the code because it 
            comes with no real overhead and is quite
            likely to be useful in a future sprint
        */
    }));

    return (<ComponentTheme item xs={12}>
        <CardActionArea disableRipple component="div">
            {betslip.map(bet => {

                return (
                <CardActions sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: "start",
                    }}>

                    <BetSlipItem key={bet.id} bet={bet} />

                </CardActions>
                )})}
        </CardActionArea>
    </ComponentTheme>)
}

export default BetSlipItemContainer