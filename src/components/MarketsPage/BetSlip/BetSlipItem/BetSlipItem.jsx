import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import ItemInfoDropdown from './ItemInfo/ItemInfoDropdown';
import BetSlipForm from './BetSlipForm/BetSlipForm';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { css, keyframes } from '@emotion/react'


// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoIcon from '@mui/icons-material/Info';

function BetSlipItem(props) {
    //& I should further destructure this
    const { bet } = props
    const { away_team, commence_time, competition, date, game_id, home_team, id, last_update, market, outcome, point, price, tag, user, wager } = bet

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)

    const [payout, newPayout] = useState((0).toFixed(2))
    const [shrink, setShrink] = useState(false);
    const [info, setInfo] = useState(false)

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
            newPoint = ''
        } else {
            console.log('some unforeseen value:', newPoint)
        }

        //& eventually let the user determine which odds format they prefer
        let cellString = `${newPoint}`
        // console.log('cell string:', cellString)

        return cellString
    }

    const cellText = getCellText(outcome, market)

    const updateWager = event => {
        for (let wager of betslip) {
            if (id === wager.id) {
                wager.wager = event
            }
        }
        newPayout((event * (bet.price.european - 1)).toFixed(2))

        //& Making a new dispatch every time somebody changes the input value seems inefficient. I should aim to send this value to the BetSlip component when the submit button is clicked over there
        dispatch({ type: 'UPDATE_WAGER', payload: betslip })
    }

    const deleteWager = () => {
        // console.log(betslip)
        let newBetslip = []
        for (let wager of betslip) {
            if (id !== wager.id) {
                // console.log(wager)
                newBetslip.push(wager)
            }
        }
        // console.log(newBetslip)
        dispatch({ type: 'DELETE_WAGER', payload: newBetslip })
    }



    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({

    }));

    return (
        <ComponentTheme container item xs={12}>

            <Grid item xs={1}>
                <IconButton 
                style={{
                    
                }}
                onClick={() => setInfo(!info)}
                >
                    {/* Market info dropdown */}
                    <InfoIcon />
                </IconButton>
            </Grid>

            <Grid item xs={9}>
                <Typography variant="h6" sx={{ display: "inline" }}>
                    {outcome} {cellText}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <IconButton onClick={deleteWager}>
                    <ClearIcon sx={{ color: 'red' }} />
                </IconButton>
            </Grid>

            {info && 
            <ItemInfoDropdown key={bet.id} bet={bet} />
            }
            
            <BetSlipForm key={id} bet={bet}/>

        </ComponentTheme>)
}

export default BetSlipItem