import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import BetSlipItem from './BetSlipItem';

// Styling
import Alert from '@mui/material/Alert';
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
    const entry = useSelector(store => store.entry)

    const [invalidInputAlert, setInvalidInputAlert] = useState(false)
    const [insufficientFundsAlert, setInsufficientFundsAlert] = useState(false)

    const handleSubmit = () => {
        console.log('in handleSubmit. Current betslip:', betslip)
        
        // validation
        const userFunds = entry.funds
        let wagerSum = 0
        
        // validate that user has entered a value > 0 in each input field
        for (let bet of betslip) {
            console.log('current bet:', bet)
            if (bet.wager <= 0) {
                // alert the user
                    // I need access to info to notify user of the specific bet that failed the check
                // terminate submission
                console.log('empty or negative wager')
                setInvalidInputAlert(true)
                return
            }
            wagerSum += Number(bet.wager)
        }

        // Validate that user has funds to place current wagers
        if (wagerSum > userFunds) {
            setInsufficientFundsAlert(true)
            return
        }

        // empty input fields
        // update user funds
            // actually, probably do this in the saga
        
        // send betslip to betslip.saga for POST
        dispatch({type: 'SUBMIT_WAGERS', payload: betslip})
        // clear betslip reducer
    }

    return (
    <Box 
        sx={{width: "20vw", 
            maxHeight: "75vh", 
            display: 'flex', 
            flexDirection: 'column', 
            position: "fixed", 
            right: "0px", 
            top: "20vh"}}
            className="container" 
    >
        <Card sx={{overflow: "scroll"}}>
            <CardHeader title={<Typography variant="h2">Bet Slip</Typography>}/>
            
            {invalidInputAlert 
                ? <Alert severity="error" onClose={() => setInvalidInputAlert(false)}>Please enter a positive value for all wagers</Alert> 
                : <></>
            }

            {insufficientFundsAlert 
                ? <Alert severity="error" onClose={() => setInsufficientFundsAlert(false)}>Insufficient funds for entered wagers</Alert> 
                : <></>
            }

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