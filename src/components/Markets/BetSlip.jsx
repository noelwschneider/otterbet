import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import BetSlipItem from './BetSlipItem';

// Styling
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './Betslip.css'

function BetSlip() {

    const bets = useSelector(store => store.betslip)
    // console.log(bets)

    return (<Box className="container">

        <Card>
            <CardHeader title={<Typography variant="h2">Bet Slip</Typography>}/>
            <CardActionArea component="div">
                <CardActions>
                    
                    <Button>Sumbit</Button>
                </CardActions>
            </CardActionArea>
        </Card>
        
    </Box>)
}

export default BetSlip