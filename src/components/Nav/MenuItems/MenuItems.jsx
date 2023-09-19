import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import UserMenu from './UserMenu';
import MarketsMenu from './MarketsMenu';
import LogOutButton from './LogOutButton';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function MenuItems() {

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        height: "inherit",
        borderBottom: "solid 1px black"
        
    }));

    return (<ComponentTheme item xs={5} >

        <Grid 
            container 
            style={{ 
                height: "inherit", 
                width: "100%",
                // height: "auto",
                
                }}>

            <UserMenu />
            <MarketsMenu />
            <LogOutButton />

        </Grid>
    </ComponentTheme>)
}

export default MenuItems