// Hooks
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import EntryMenuDropdown from './EntryMenuDropdown';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Styling
import Button from '@mui/material/Button';

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


    // This could benefit from modularization
    const handleSubmit = () => {

        // validation
        const userFunds = entry[selectedEntry].funds
        
        // validate that user has entered a value > 0 in each input field
        let wagerSum = 0
        for (let bet of betslip) {
            if (bet.wager <= 0) {
                //! I need access to info to notify user of the specific bet that failed the check
                // terminate submission
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

        setWagerSum(0)
    }

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({

    }));

    return (
        <ComponentTheme container style={{padding: "16px"}}>

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
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>

            </Grid>

        </ComponentTheme>
    )
}

export default EntryMenu