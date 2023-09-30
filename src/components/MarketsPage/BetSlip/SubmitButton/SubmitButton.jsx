// Hooks
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Style tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function SubmitButton() {
    const dispatch = useDispatch()

    // Global State
    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    // Local State
    const [selectedEntry, setSelectedEntry] = useState(0)

    // Submit handler
    const handleSubmit = () => {

        // validation
        const userFunds = entry[selectedEntry].funds

        // validate that user has entered a value > 0 in each input field
        let wagerSum = 0
        for (let bet of betslip) {
            if (bet.wager <= 0) {
                //! I need access to info to notify user of the specific bet that failed the check
                //& render the alert to the DOM
                return
            }
            wagerSum += Number(bet.wager)
        }

        // Validate that user has funds to place current wagers
        if (wagerSum > userFunds) {
            //& Render the appropriate alert to the DOM
            return
        }

        betslip.map(bet => {
            bet.entry_id = entry[selectedEntry].id
        })

        // send betslip to betslip.saga for POST
        dispatch({ type: 'SUBMIT_WAGERS', payload: { betslip, wagerSum, user, entry: entry[selectedEntry] } })
    }

    // Custom theming
    const theme = useTheme();
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        padding: "16px"
    }));

    return (
        <ComponentTheme container item xs={12}>
                <Button onClick={handleSubmit} style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                }}>
                    Submit
                </Button>
        </ComponentTheme>
    )
}

export default SubmitButton 