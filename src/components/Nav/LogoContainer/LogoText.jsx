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

function LogoText() {

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        height: "inherit",
        alignItems: "flex-end",
        display: "flex",
    }));

    return (
        <ComponentTheme item xs={9}>
            <img
                className="nav-logo"
                alt="logo-text"
                style={{
                    height: "100%",
                }}
                src={logoText}
            />
        </ComponentTheme>)
}

export default LogoText