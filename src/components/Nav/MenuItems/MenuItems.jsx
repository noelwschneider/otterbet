import React from 'react';

// Components
import UserMenu from './UserMenu';
import MarketsMenu from './MarketsMenu';
import LogOutButton from './LogOutButton';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function MenuItems() {

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
            }}>

            <UserMenu />
            <MarketsMenu />
            <LogOutButton />

        </Grid>
    </ComponentTheme>)
}

export default MenuItems