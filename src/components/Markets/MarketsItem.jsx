import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styling
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

function MarketsItem({game}) {
    // console.log(game)

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)
    const user = useSelector(store => store.user)

    const {away, date, time, competition, home, id, markets} = game
    // console.log('game:', game)
    // console.log('markets:', markets)

    // Add tags to each market for matching to table cell
    for (let market of markets) {
        // console.log('current market', market)
        market.tag = `${market.outcome}_${market.market}`
        // console.log(market.tag)
    }
    // console.log('markets with tags added:', markets)

    const newAddBet = (outcome, market) => {
        console.log('in newAddBet:', outcome, market)

        //& Rename this variable
        for (let x of markets) {
            if(x.tag === `${outcome}_${market}`) {
                // console.log('if has executed for', x)

                for (let bet of betslip) {
                    if (bet.id === x.id) {
                        console.log('duplicate wager, not sending to store')
                        return
                    }
                }
                x.wager = 0
                x.user = user.id
                x.home_team = home
                x.away_team = away
                x.commence_time = time
                x.game_id = id
                x.competition = competition
                console.log('state of new bet before sending', x)
                dispatch({type: 'SET_BETSLIP', payload: x})
            }
        }
    }

    const getCellText = (outcome, market) => {
        // console.log(outcome, market)

        let cellArray = markets.filter( x => x.outcome === outcome && x.market === market)
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
            cellObject.point =  ''
        } else {
            console.log('some unforeseen value:', cellObject.point)
        }

        //& eventually let the user determine which odds format they prefer
        let cellString = `${cellObject.point} (${cellObject.price.american})`
        // console.log('cell string:', cellString)

        return cellString
    }

    //& Row header styling is inelegant and makes it hard to read. 
    return (
        <TableContainer sx={{width: "60vw", margin: "10px", border: "solid 2px black", borderCollapse: "collapse"}}>
            <Table >
                <TableHead >
                    <TableRow sx={{backgroundColor: "lightslategray", border: "solid 2px black", borderCollapse: "collapse"}}>
                        <TableCell>
                            <Typography variant="subtitle2" sx={{fontStyle: "italic"}}>{date} {time}</Typography>
                        </TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Spread</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Moneyline</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Over/Under</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody >
                    <TableRow className="away-row" sx={{border: "solid 1px black", borderCollapse: "collapse"}}>
                        <TableCell>{away}</TableCell>
                        <TableCell 
                            className="away-spread"
                            onClick={() => newAddBet(away, 'spreads')}
                            >
                            {getCellText(away, 'spreads')}
                        </TableCell>

                        <TableCell 
                            className="away-moneyline"
                            onClick={() => newAddBet(away, 'h2h')}
                            >
                            {getCellText(away, 'h2h')}
                        </TableCell>

                        <TableCell 
                            className="under"
                            onClick={() => newAddBet('Over', 'totals')}
                            >
                            o{getCellText('Over', 'totals')}
                        </TableCell>
                    </TableRow>

                    <TableRow className="home-row" sx={{border: "solid 1px black", borderCollapse: "collapse"}}>
                        <TableCell>{home}</TableCell>
                        <TableCell 
                            className="home-spread"
                            onClick={() => newAddBet(home, 'spreads')}
                            >
                            {getCellText(home, 'spreads')}
                        </TableCell>

                        <TableCell 
                            className="home-moneyline"
                            onClick={() => newAddBet(home, 'h2h')}
                            >
                            {getCellText(home, 'h2h')}
                        </TableCell>

                        <TableCell 
                            className="under"
                            onClick={() => newAddBet('Under', 'totals')}
                            >
                            u{getCellText('Over', 'totals')}   
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
)
}

export default MarketsItem