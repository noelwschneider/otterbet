// Hooks
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../../hooks/useStore';

// Components
import Wagers from './Wager/Wagers';
import BetSlipAlerts from './BetSlipAlerts';
import EntryMenu from './EntryMenu/EntryMenu';
import SubmitButton from './SubmitButton/SubmitButton';
import BetSlipHeader from './BetSlipHeader';

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import {
    Grid,
    Card,
} from '@mui/material';


export default function BetSlip() {
    const dispatch = useDispatch();

    const user = useStore("user");
    const entries = useStore("entries");
    const [entryIndex, setEntryIndex] = useState(0);
    const [entry, setEntry] = useState(entries[0]);

    useEffect(() => {
        setEntry(entries[entryIndex]);
    }, [entryIndex]);

    useEffect(() => {
        dispatch({ type: 'FETCH_ENTRY', payload: user.id })
    }, []);

    return (
        <Grid 
        component={Card}
        container 
        item 
        xs={5} 
        sx={styles.betslip.container} >

            <BetSlipHeader />
            <BetSlipAlerts />
            <EntryMenu props={{ entry, setEntryIndex }} />
            <Wagers />
            <SubmitButton props={{ entry }} />

        </Grid>)
}