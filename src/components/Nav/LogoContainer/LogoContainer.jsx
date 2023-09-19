import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import LogoPicture from './LogoPicture';
import LogoText from './LogoText';

// Logo images
import logoText from './OtterBet logo text.png'
import logo from './otter-logo-1.png'
import moneyLogo from './money-otter-logo-1.png'

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function LogoContainer() {

    const theme = useTheme()
    const ComponentTheme = styled(Grid)({
        height: "inherit",
        // border: "2px dashed black"
    });

    return (<ComponentTheme item xs={7}>

        <Grid container height={"100%"}>
            <LogoText />
            <LogoPicture />
        </Grid>

    </ComponentTheme>)

}

export default LogoContainer