import React from 'react';

// Components
import LogoPicture from './LogoPicture';
import LogoText from './LogoText';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function LogoContainer() {

    const ComponentTheme = styled(Grid)({
        height: "inherit",
    });

    return (
    <ComponentTheme item xs={7}>

        <Grid container height={"100%"}>
            <LogoText />
            <LogoPicture />
        </Grid>

    </ComponentTheme>)

}

export default LogoContainer