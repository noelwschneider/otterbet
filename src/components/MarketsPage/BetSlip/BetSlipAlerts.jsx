import React, { useState } from 'react';


// Style Tools
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function BetSlipAlerts() {
    const [invalidInputAlert, setInvalidInputAlert] = useState(false)
    const [insufficientFundsAlert, setInsufficientFundsAlert] = useState(false)

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        /* 
            Though currently unused, I am leaving this 
            styling component in the code because it 
            comes with no real overhead and is quite
            likely to be useful in a future sprint
        */
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