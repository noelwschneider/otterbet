import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function MarketsMenu() {

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        alignSelf: "flex-end",
        backgroundColor: theme.palette.primary.dark,
        border: "1px solid black",
                borderRadius: "10px 10px 0px 0px",
                overflow: "hidden",
                backgroundClip: "border-box"
    }));

    const history = useHistory()

    const handleNavigation = (event) => {
        history.push(event.currentTarget.id)
    }

    return (<ComponentTheme item xs={4}>

        <Button
            id='/markets'
            variant="text"
            className="navLink"
            style={{  width: "100%", color: theme.palette.primary.contrastText }}
            onClick={event => handleNavigation(event)}>
            Markets
        </Button>

    </ComponentTheme>)
}

export default MarketsMenu