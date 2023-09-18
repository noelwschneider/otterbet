import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

// Components

import BetSlipItemContainer from './BetSlipItem/BetSlipItemContainer';
import BetSlipAlerts from './BetSlipAlerts';
import EntryMenuContainer from './EntryMenuContainer/EntryMenuContainer';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Styling
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function BetSlip() {
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    useEffect(() => {
        dispatch({ type: 'FETCH_ENTRY', payload: user.id })
        console.log(selectedEntry)
    }, [])

    const [selectedEntry, setSelectedEntry] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const [invalidInputAlert, setInvalidInputAlert] = useState(false)
    const [insufficientFundsAlert, setInsufficientFundsAlert] = useState(false)

    const handleEntryClick = (index) => {
        setSelectedEntry(index);
        setAnchorEl(null)
    }

    // This could benefit from modularization
    const handleSubmit = () => {
        console.log('in handleSubmit. Current betslip:', betslip)

        // validation
        const userFunds = entry[selectedEntry].funds
        let wagerSum = 0

        // validate that user has entered a value > 0 in each input field
        for (let bet of betslip) {
            console.log('current bet:', bet)
            if (bet.wager <= 0) {
                // alert the user
                // I need access to info to notify user of the specific bet that failed the check
                // terminate submission
                console.log('empty or negative wager')
                setInvalidInputAlert(true)
                return
            }
            wagerSum += Number(bet.wager)
        }

        // Validate that user has funds to place current wagers
        if (wagerSum > userFunds) {
            setInsufficientFundsAlert(true)
            return
        }

        betslip.map(bet => {
            bet.entry_id = entry[selectedEntry].id
        })

        // send betslip to betslip.saga for POST
        dispatch({ type: 'SUBMIT_WAGERS', payload: { betslip, wagerSum, user, entry: entry[selectedEntry] } })
    }

    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({

    }));

    return (
        <ComponentTheme container item xs={5}>
            <Grid item xs={12}>
                <Card style={{ overflow: "scroll" }}>

                    <Grid container>
                        {/* Bet Slip Title */}
                        <Grid item xs={12}>
                            <CardHeader title={<Typography variant="h2">Bet Slip</Typography>} />
                        </Grid>

                        <Grid item xs={12}>
                            <BetSlipAlerts />
                        </Grid>

                        <Grid item xs={12}>
                            <EntryMenuContainer />
                        </Grid>


                        <Grid container item xs={12}>
                            <BetSlipItemContainer />
                        </Grid>

                    </Grid>
                </Card>
            </Grid>
        </ComponentTheme>)
}

export default BetSlip