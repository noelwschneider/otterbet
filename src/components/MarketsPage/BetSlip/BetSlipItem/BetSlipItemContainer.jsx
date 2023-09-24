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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
            <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: "start" }}>
                {betslip.map(bet => (
                    <BetSlipItem key={bet.id} bet={bet} />
                ))}       
            </CardActions>
        </CardActionArea>
    </ComponentTheme>)
}

export default BetSlipItemContainer