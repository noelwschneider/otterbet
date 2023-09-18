import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import MarketsItem from './MarketsItem/MarketsItem';
import BetSlip from '../BetSlip/BetSlip';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function MarketsCol() {
    const dispatch = useDispatch()

    
    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    //& Static dates for development purposes. Refactor into dynamic feature
    const [startDate, setStartDate] = useState('2023-09-13')
    const [endDate, setEndDate] = useState('2023-09-20')

    const dateRange = {
        startDate,
        endDate
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_ODDS', payload: dateRange })
    }, [])

    const markets = useSelector(store => store.odds)
    
    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        height: "100%"
    }));


    return (<ComponentTheme item xs={7}>

        <Typography variant="h2">NFL</Typography>

        {/* Market items render here */}
        {markets.map(game => (
            <MarketsItem key={game.id} game={game} />
        ))}

    </ComponentTheme>)
}

export default MarketsCol 