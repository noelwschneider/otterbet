import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function LogOutButton() {

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        alignSelf: "flex-end",
        backgroundColor: theme.palette.primary.dark,
        borderRadius: 0,
    }));

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch({})
    }

    return (<ComponentTheme item xs={4}>

        <Button
            variant="text"
            className="navLink"
            style={{ width: "100%", color: theme.palette.primary.contrastText }}
            onClick={() => dispatch({ type: 'LOGOUT' })}
            >
            Log Out
        </Button>

    </ComponentTheme>
    )}

export default LogOutButton