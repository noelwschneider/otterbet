// Hooks
import { useDispatch } from 'react-redux';
import useStore from '../../../../hooks/useStore';

// Style
import {
    Grid,
    Typography,
    IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { styles } from '../../../../styling/styles';

// Utilities
import { getPoint } from '../../../../utilities/_utilities';


export default function Header({ bet }) {
    const dispatch = useDispatch();

    const betslip = useStore("betslip");

    const deleteWager = (id) => {
        let newBetslip = [];
        for (let wager of betslip) {
            if (id !== wager.id) {
                newBetslip.push(wager);
            }
        }
        dispatch({ type: 'DELETE_WAGER', payload: newBetslip });
    }

    return (
        <Grid container item>

            <Grid
            item
            xs={10}
            component={Typography}
            variant="h6"
            children={`${bet.outcome} ${getPoint(bet)}`} />

            <Grid
            item 
            xs={2}
            component={IconButton}
            onClick={() => deleteWager(bet.id)}
            children={<ClearIcon />}
            sx={styles.betslip.item.clearWagerIcon} />

        </Grid>
    )
}