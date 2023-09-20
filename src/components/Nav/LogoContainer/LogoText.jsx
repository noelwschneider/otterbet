import React from 'react';

// Logo images
import logoText from './OtterBet logo text.png'

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function LogoText() {

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