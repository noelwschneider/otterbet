import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import BetSlipItemContainer from './BetSlipItem/BetSlipItemContainer';
import BetSlipAlerts from './BetSlipAlerts';
import EntryMenuContainer from './EntryMenuContainer/EntryMenuContainer';

// Style Tools
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Styling
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

function BetSlip() {
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    useEffect(() => {
        dispatch({ type: 'FETCH_ENTRY', payload: user.id })
    }, [])

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        paddingTop: "2vh",
    }));

    return (
        <ComponentTheme container item xs={5}>
            <Grid item xs={12}>
                <Card style={{ overflow: "scroll" }}>

                    <Grid container>
                        {/* Bet Slip Title */}
                        <Grid item xs={12}>
                            <CardHeader title={<Typography variant="h2">Bet Slip</Typography>} />
                        </Grid>

                        <Grid item xs={12}>
                            <BetSlipAlerts />
                        </Grid>

                        <Grid item xs={12}>
                            <EntryMenuContainer />
                        </Grid>

                        <Grid container item xs={12}>
                            <BetSlipItemContainer />
                        </Grid>

                    </Grid>
                </Card>
            </Grid>
        </ComponentTheme>)
}

export default BetSlip