// Hooks
import { useState } from 'react';

// Style Components
import { 
  Grid,
  Alert,
} from '@mui/material';


export default function BetSlipAlerts() {
    const [invalidInputAlert, setInvalidInputAlert] = useState(false)
    const [insufficientFundsAlert, setInsufficientFundsAlert] = useState(false)

    return (
        <Grid item xs={12}>
            {/* Alert to render when user has not submitted a valid wager */}
            {invalidInputAlert
                ?   <Alert severity="error" onClose={() => setInvalidInputAlert(false)}>
                        Please enter a positive value for all wagers
                    </Alert>
                :   <></>
            }

            {/* Alert to render when the user has submitted wagers they cannot afford */}
            {insufficientFundsAlert
                ?   <Alert severity="error" onClose={() => setInsufficientFundsAlert(false)}>
                        Insufficient funds for entered wagers
                    </Alert>
                :   <></>
            }
        </Grid>
    )
}