import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { InputLabelProps } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import FormControl from '@mui/material/FormControl';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function BetSlipItem(props) {
    //& I should further destructure this
    const {bet} = props
    const {away_team, commence_time, competition, game_id, home_team, id, last_update, market, outcome, point, price, tag, user, wager} = bet

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)

    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        
    }));

    const [payout, newPayout] = useState((0).toFixed(2))
    const [shrink, setShrink] = useState(false);

    //& A slightly different version of this is used in MarketItem.jsx. Long-term plan is to modularize
    const getCellText = (outcome, market) => {

        if (market === 'h2h') {
            return price.american
        }
        
        let prefix = ''
        if (market === 'spreads') {
            prefix = '+'
        }
         
        //! I need to figure out what odds-api will give me for the point property if the line is 0 -- it will probably be a string, but could be 0
        let newPoint = point
        if (newPoint >= 0) {
            newPoint = `${prefix}${Number(newPoint).toFixed(1)}`
        } else if (newPoint < 0) {
            newPoint = `${Number(newPoint).toFixed(1)}`
        } else if (!newPoint) {
            newPoint =  ''
        } else {
            console.log('some unforeseen value:', newPoint)
        }

        //& eventually let the user determine which odds format they prefer
        let cellString = `${newPoint} (${price.american})`
        // console.log('cell string:', cellString)

        return cellString
    }

    const cellText = getCellText(outcome, market)

    const updateWager = event => {
        for (let wager of betslip) {
            if( id === wager.id) {
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
            if( id !== wager.id) {
                // console.log(wager)
                newBetslip.push(wager)
            } 
        }
        // console.log(newBetslip)
        dispatch({type: 'DELETE_WAGER', payload: newBetslip})
    }

    const gameInfo = `${away_team} at ${home_team}`
    //! I need a formatted timestamp for this part (and a bunch of other places in this project)

    return (<Box 
    className="container"
    flexDirection="column"
    alignItems="left">
        
        <Typography variant="h6" sx={{display: "inline"}}>
            {outcome} {cellText}
        </Typography>

        <IconButton onClick={deleteWager}>
            <ClearIcon sx={{color: 'red'}}/>
        </IconButton>
        

        <Typography variant="caption">
               <br/>
               {gameInfo} <br/>
               {commence_time} <br/>
               {/* Add code to display "moneyline" or "spread" */}
               {market}
               <br/>
        </Typography>

        <TextField 
            label="Risk"
            id="wager-input"
            required 
            type="number"
            InputProps={{
                startAdornment: <AttachMoneyIcon />,
                inputProps: {min: 0}
            }}
            // I need to make sure I get what is going on in the below styling
            InputLabelProps={{ 
               sx: {marginLeft: 3},
                shrink 
            }}
            onWheel={event => { event.target.blur(); }}
            onFocus={() => setShrink(true)}
            onBlur={(e) => setShrink(!!e.target.value)}
            onChange={event => updateWager(event.target.value)}
        />
        
        <Typography variant="h6">
            To Win: ${payout}
        </Typography>

    </Box>)
}

export default BetSlipItem