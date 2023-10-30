import { useState } from 'react';


// Style Components
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function BetSlipAlerts() {
    const [invalidInputAlert, setInvalidInputAlert] = useState(false)
    const [insufficientFundsAlert, setInsufficientFundsAlert] = useState(false)



    return (<Grid item xs={12}>
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
    </Grid>)
}

export default BetSlipAlerts