import React, { useState } from 'react';

// Logo images
import logo from './otter-logo-1.png'

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function LogoPicture() {

    const ComponentTheme = styled(Grid)(({ theme }) => ({
        height: "inherit",
        border: "0px dashed black"
    }));

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