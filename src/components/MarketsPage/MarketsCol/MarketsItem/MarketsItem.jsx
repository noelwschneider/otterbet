import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Styling
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Components
import MarketItemHeader from './Rows/MarketItemHeader';
import HomeRow from './Rows/HomeRow';
import AwayRow from './Rows/AwayRow';

function MarketsItem({ game }) {
    // console.log(game)

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)
    const user = useSelector(store => store.user)

    const { markets } = game
    // console.log('game:', game)
    // console.log('markets:', markets)

    // Add tags to each market for matching to table cell
    for (let market of markets) {
        // console.log('current market', market)
        market.tag = `${market.outcome}_${market.market}`
        // console.log(market.tag)
    }
    // console.log('markets with tags added:', markets)

    const getCellText = (outcome, market) => {
        // console.log(outcome, market)

        let cellArray = markets.filter(x => x.outcome === outcome && x.market === market)
        // console.log(cellArray)

        let [cellObject] = cellArray
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
            cellObject.point = ''
        } else {
            console.log('some unforeseen value:', cellObject.point)
        }

        //& eventually let the user determine which odds format they prefer
        let cellString = `${cellObject.point} (${cellObject.price.american})`
        // console.log('cell string:', cellString)

        return cellString
    }

    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        width: "45vw",
        margin: "10px",
    }));

    //& Row header styling is inelegant and makes it hard to read. 

    //& Idea for refactor: the individual grids should be columns (team names, spreads, ML, O/U). I hate the way O/U lines are displayed, and it's 100% because everybody uses rows. Just make it one cell so the number is render once, and the user clicks on over or under.
        //& You could actually do something pretty similar with spreads, though it might not be as visually intuitive for users. Worth playing with.

    return (
    <ComponentTheme container>

        <Grid container>
            <MarketItemHeader game={game}/>
            <AwayRow game={game}/>
            <HomeRow game={game}/>
        </Grid>
            
    </ComponentTheme>
    )
}

export default MarketsItem