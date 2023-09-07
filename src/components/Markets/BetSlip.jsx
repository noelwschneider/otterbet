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
    const dispatch = useDispatch()

    const betslip = useSelector(store => store.betslip)
    // console.log(betslip)

    const handleSubmit = () => {
        console.log('in handleSubmit. Current betslip:', betslip)
        
        // validate bets
        //! This is a placeholder value -- need code for actual user funds

        const userFunds = 1000
        let wagerSum = 0


        for (let bet of betslip) {
            if (bet.wager <= 0) {
                // alert the user
                    // I need access to info to notify user of the specific bet that failed the check
                // terminate submission

                console.log('empty wager value')
            }

            wagerSum += userFunds
        }

        if (wagerSum > userFunds) {
            // alert the user
            // terminate submission

            console.log(`Insufficient funds. User funds: ${userFunds} || Wager total: ${wagerSum}`)
        }

            // empty input fields
            // update user funds
                // actually, probably do this in the saga

        
        // send betslip to betslip.saga for POST
        dispatch({type: 'SUBMIT_WAGERS', payload: betslip})
        // clear betslip reducer
    }

    return (<Box sx={{width: "20vw", maxHeight: "75vh", display: 'flex', flexDirection: 'column', position: "fixed", right: "0px", top: "20vh"}}

        className="container" 
 >

        <Card sx={{overflow: "scroll"}}>
            <CardHeader title={<Typography variant="h2">Bet Slip</Typography>}/>
            <CardActionArea component="div">
                <CardActions sx={{display: 'flex', flexDirection: 'column'}}>
                    {betslip.map( bet => (
                        <BetSlipItem key={bet.id} bet={bet}/>
                    ))}
                    <Button onClick={handleSubmit}>Sumbit</Button>
                </CardActions>
            </CardActionArea>
        </Card>
        
    </Box>)
}

export default BetSlip