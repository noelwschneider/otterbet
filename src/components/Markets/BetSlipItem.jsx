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
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

function BetSlipItem(props) {
    //& I should further destructure this
    const {bet} = props
    // console.log(bet)

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)
    // console.log(betslip)

    const [payout, newPayout] = useState((0).toFixed(2))

    //& A slightly different version of this is used in MarketItem.jsx. Long-term plan is to modularize
    const getCellText = (outcome, market) => {
       
        let cellObject = bet
        // console.log(cellObject)

        if (cellObject.market === 'h2h') {
            return cellObject.price.american
        }
        
        let prefix = ''
        if (cellObject.market === 'spreads') {
            prefix = '+'
        }
        //! I need to figure out what odds-api will give me for the point property if the line is 0 -- it will probably be a string, but could be 0
        if (cellObject.point >= 0) {
            cellObject.point = `${prefix}${Number(cellObject.point).toFixed(1)}`
        } else if (cellObject.point < 0) {
            // console.log('less than 0:', cellObject.point)
            cellObject.point = `${Number(cellObject.point).toFixed(1)}`
        } else if (!cellObject.point) {
            // console.log('null:', cellObject.point)
            cellObject.point =  ''
        } else {
            console.log('some unforeseen value:', cellObject.point)
        }

        //& eventually let the user determine which odds format they prefer
        let cellString = `${cellObject.point} (${cellObject.price.american})`
        // console.log('cell string:', cellString)

        return cellString
    }

    const cellText = getCellText(bet.outcome, bet.market)

    const updateWager = event => {
        for (let wager of betslip) {
            if( bet.id === wager.id) {
                wager.wager = event
            } 
        }
        newPayout((event * (bet.price.european - 1)).toFixed(2))

        //& Making a new dispatch every time somebody changes the input value seems inefficient. I should aim to send this value to the BetSlip component when the submit button is clicked over there
        dispatch({type: 'UPDATE_WAGER', payload: betslip})
    }

    const deleteWager = () => {
        // console.log(betslip)
        let newBetslip = []
        for (let wager of betslip) {
            if( bet.id !== wager.id) {
                // console.log(wager)
                newBetslip.push(wager)
            } 
        }
        // console.log(newBetslip)
        dispatch({type: 'DELETE_WAGER', payload: newBetslip})
    }

    
    return (<Box 
    className="container"
    flexDirection="column">
        

        <Typography variant="h6" sx={{display: "inline"}}>
            {bet.outcome} {cellText}
        </Typography>

        <IconButton onClick={deleteWager}>
            <ClearIcon sx={{color: 'red'}}/>
        </IconButton>
        

        <Typography variant="caption">
               {/* Add game info */}
               (GAME INFO HERE) <br/>
               {/* Add code to display "moneyline" or "spread" */}
               {bet.market}
        </Typography>

        <InputLabel htmlFor="wager-input">Risk</InputLabel>
        <TextField 
        id="wager=input"
        required 
        type="number"
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: {min: 0}
        }}
        onChange={event => updateWager(event.target.value)}
        onWheel={event => { event.target.blur(); }}
        />

        <Typography variant="h6">
            To Win: ${payout}
        </Typography>

    </Box>)
}

export default BetSlipItem