import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Developer Components
import Palette from './Palette';

// Components
// import MenuItems from './MenuItems/MenuItems';
// import LogoContainer from '../Nav/LogoContainer/LogoContainer';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';



function StylePlayground() {

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        height: "115px",
        margin: "0px 0px 0px 0px"
    }));

    return (<>
        {/* Palette demo */}
        <Palette />

        {/* Nav */}
        <ComponentTheme container>  

        </ComponentTheme>
    </>)
}

export default StylePlayground