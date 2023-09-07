import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function BetSlipItem(props) {
    const {bet} = props
    // console.log(bet)

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)
    console.log(betslip)

    const [wager, newWager] = useState('')
    
    const updateWager = event => {
        for (let wager of betslip) {
            if( bet.id === wager.id) {
                wager.wager = event
            } 
        }
        dispatch({type: 'UPDATE_WAGER', payload: betslip})
    }

    return (<Box className="container">
                <Typography variant="h6">Bet</Typography>
                <TextField 
                onChange={event => updateWager(event.target.value)}
                placeholder='Enter wager amount'
                />
    </Box>)
}

export default BetSlipItem