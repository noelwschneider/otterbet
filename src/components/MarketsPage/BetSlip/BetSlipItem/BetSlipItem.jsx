import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import ItemInfoDropdown from './ItemInfo/ItemInfoDropdown';
import BetSlipForm from './BetSlipForm/BetSlipForm';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

function BetSlipItem(props) {
    const { bet } = props
    const { 
        id, 
        market, 
        outcome, 
        point, 
        price 
    } = bet

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)

    //& A slightly different version of this is used in MarketItem.jsx. Long-term plan is to modularize
    const getCellText = (market) => {

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

        //& eventually let the user determine whether they prefer American or European odds format
        let cellString = `${newPoint}`

        return cellString
    }

    const cellText = getCellText(market)

    const deleteWager = () => {
        let newBetslip = []
        for (let wager of betslip) {
            if (id !== wager.id) {
                newBetslip.push(wager)
            }
        }
        dispatch({ type: 'DELETE_WAGER', payload: newBetslip })
    }

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        /* 
            Though currently unused, I am leaving this 
            styling component in the code because it 
            comes with no real overhead and is quite
            likely to be useful in a future sprint
        */
    }));

    return (
        <ComponentTheme container item xs={12}>

            <Grid item xs={10}>
                <Typography variant="h6" sx={{ display: "inline" }}>
                    {outcome} {cellText}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <IconButton onClick={deleteWager}>
                    <ClearIcon sx={{ color: 'red' }} />
                </IconButton>
            </Grid>
            
            <ItemInfoDropdown key={bet.id} bet={bet} />
            
            <BetSlipForm key={id} bet={bet}/>

        </ComponentTheme>)
}

export default BetSlipItem