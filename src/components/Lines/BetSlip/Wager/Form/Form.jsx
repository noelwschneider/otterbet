// Hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../../../../hooks/useStore';

// Style
import {
    Grid,
    Typography,
    TextField,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function Form({ bet }) {
    const { id } = bet;

    const dispatch = useDispatch();
    const betslip = useStore("betslip");

    const [payout, setPayout] = useState((0).toFixed(2));
    const [shrink, setShrink] = useState(false);

    const updateWager = event => {
        for (let wager of betslip) {
            if (id === wager.id) {
                wager.wager = event;
            }
        }
        setPayout((event * (bet.price.european)).toFixed(2));

        //! Making a new dispatch every time somebody changes the input value seems inefficient. I should aim to send this value to the BetSlip component when the submit button is clicked over there
        dispatch({ type: 'UPDATE_WAGER', payload: betslip });
    }

    return (
        <Grid container item xs={12}>

            {/* !Consider refactoring this into a <FormControl> component, with <Input> and <InputLabel>. Might improve readability, as all the props I'm currently using are a bit messy */}

            <Grid component={TextField}
                item xs={12}
                label="Risk"
                id="wager-input"
                required
                type="number"
                InputProps={{
                    startAdornment: <AttachMoneyIcon />,
                    inputProps: { min: 0 }
                }}
                InputLabelProps={{
                    sx: { marginLeft: 3 },
                    shrink
                }}
                onWheel={event => { event.target.blur(); }}
                onFocus={() => setShrink(true)}
                onBlur={(e) => setShrink(!!e.target.value)}
                onChange={event => updateWager(event.target.value)}
            />

            <Grid item xs={12} component={Typography} variant="h6">
                Payout: ${payout}
            </Grid>

        </Grid>
    )
}