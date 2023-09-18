import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

function BetSlipAlerts() {
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    const [selectedEntry, setSelectedEntry] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const [invalidInputAlert, setInvalidInputAlert] = useState(false)
    const [insufficientFundsAlert, setInsufficientFundsAlert] = useState(false)

    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({

    }));

    return (<ComponentTheme>
        {/* Alert to render when user has not submitted a valid wager */}
        {invalidInputAlert
                ? <Alert severity="error" onClose={() => setInvalidInputAlert(false)}>Please enter a positive value for all wagers</Alert>
                : <></>
            }

            {/* Alert to render when the user has submitted wagers they cannot afford */}
            {insufficientFundsAlert
                ? <Alert severity="error" onClose={() => setInsufficientFundsAlert(false)}>Insufficient funds for entered wagers</Alert>
                : <></>
            }
    </ComponentTheme>)
}

export default BetSlipAlerts