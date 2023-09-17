import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Logo images
import logoText from './OtterBet logo text.png'
import logo from './otter-logo-1.png'
import moneyLogo from './money-otter-logo-1.png'

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function LogoPicture() {

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        height: "inherit",
        border: "0px dashed black"
    }));

    // To toggle the otter to money eyes
    const [otter, setOtter] = useState(true)

    return (<ComponentTheme item xs={3} >

        <img
            className="nav-logo"
            src={logo}
            alt="OtterBet logo"
            style={{
                height: "100%"
            }}
        />

    </ComponentTheme>)
}

export default LogoPicture