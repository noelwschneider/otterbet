import React from 'react';
import { useDispatch } from 'react-redux';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function LogOutButton() {

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        alignSelf: "flex-end",
        backgroundColor: theme.palette.primary.dark,
        border: "1px solid black",
                borderRadius: "10px 10px 0px 0px",
                overflow: "hidden",
                backgroundClip: "border-box"
    }));

    const dispatch = useDispatch()

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