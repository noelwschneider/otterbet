// Hooks
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

// Components
import EntryMenuDropdown from './EntryMenuDropdown';

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

function EntryMenu() {

    const dispatch = useDispatch()

    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    // State
    const [selectedEntry, setSelectedEntry] = useState(0)
    const [wagerSum, setWagerSum] = useState(0)
    const [maxWinnings, setMaxWinnings] = useState(0)

    // Validation state
    const [invalidInputAlert, setInvalidInputAlert] = useState(false)
    const [insufficientFundsAlert, setInsufficientFundsAlert] = useState(false)

    const trackWagerData = () => {
        console.log('in trackWagerData. Current betslip:', betslip)
        let wagerSum = 0
        let maxWinnings = 0

        for (let bet of betslip) {
            console.log('current bet:', bet)
            wagerSum += bet.wager
            maxWinnings += (bet.wager * bet.price.european)
        }
        console.log('wagerSum:', wagerSum)
        console.log('max winnings:', maxWinnings)
    }

    useEffect(() => {
        trackWagerData()
    }, [betslip])


    // This could benefit from modularization
    const handleSubmit = () => {
        console.log('in handleSubmit. Current betslip:', betslip)

        // validation
        const userFunds = entry[selectedEntry].funds
        
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
    //! CHANGE TO APPROPRIOATE COMPONENT
    const ComponentTheme = styled(Grid)(({ theme }) => ({

    }));

    return (
        <ComponentTheme container>

            {/* Available funds display */}
            <Grid item xs={12}>
                <span>
                    <Typography variant="h5">
                        <strong>Available funds: </strong>
                        ${Number(entry[selectedEntry].funds).toFixed(2)}
                    </Typography>
                </span>
            </Grid>


            <Grid container item xs={12}>

                {/* Dropdown menu */}
                <Grid item xs={6}>
                    <EntryMenuDropdown />
                </Grid>

                {/* Submit button */}
                <Grid item xs={6}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Grid>

            </Grid>

        </ComponentTheme>
    )
}

export default EntryMenu