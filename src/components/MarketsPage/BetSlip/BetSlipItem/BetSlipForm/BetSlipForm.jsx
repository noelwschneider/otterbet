import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { css, keyframes } from '@emotion/react'

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


function BetSlipForm({ bet }) {

    const { id } = bet

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)

    const [payout, newPayout] = useState((0).toFixed(2))
    const [shrink, setShrink] = useState(false);

    const updateWager = event => {
        const newBetslip = []
        
        for (let wager of betslip) {
            if (id === wager.id) {
                wager.wager = event
            }
        }
        newPayout((event * (bet.price.european)).toFixed(2))

        //& Making a new dispatch every time somebody changes the input value seems inefficient. I should aim to send this value to the BetSlip component when the submit button is clicked over there
        dispatch({ type: 'UPDATE_WAGER', payload: betslip })
    }

    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({

    }));

    return (
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <TextField
                    label="Risk"
                    id="wager-input"
                    required
                    type="number"
                    InputProps={{
                        startAdornment: <AttachMoneyIcon />,
                        inputProps: { min: 0 }
                    }}
                    // I need to make sure I get what is going on in the below styling
                    InputLabelProps={{
                        sx: { marginLeft: 3 },
                        shrink
                    }}
                    onWheel={event => { event.target.blur(); }}
                    onFocus={() => setShrink(true)}
                    onBlur={(e) => setShrink(!!e.target.value)}
                    onChange={event => updateWager(event.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6">
                    Payout: ${payout}
                </Typography>
            </Grid>

        </Grid>)
}

export default BetSlipForm