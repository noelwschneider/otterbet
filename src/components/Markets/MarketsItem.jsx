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

function MarketsItem({game}) {
    // console.log(game)

    const {away_team, commence_time, competition, home_team, id, markets} = game
    // console.log(markets)

    // Add tags to each market for matching to table cell
    for (let market of markets) {
        // console.log('current market', market)
        market.tag = `${market.outcome}_${market.market}`
        // console.log(market.tag)
    }
    // console.log('markets with tags added:', markets)

    const newAddBet = (outcome, market) => {
        console.log('in newAddBet:', outcome, market)
        for (let x of markets) {
            if(x.tag === `${outcome}_${market}`) {
                console.log('if has executed for', x.tag)
                // add it to bet slip
            }
        }
    }

    

    const getCellText = (outcome, market) => {
        let cellArray = markets.filter( x => x.outcome === outcome && x.market === market)
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

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Spread</TableCell>
                        <TableCell>Moneyline</TableCell>
                        <TableCell>Over/Under</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow className="away-row">
                        <TableCell>{away_team}</TableCell>
                        <TableCell 
                            className="away-spread"
                            onClick={() => newAddBet(away_team, 'spreads')}
                            >
                            {getCellText(away_team, 'spreads')}
                        </TableCell>

                        <TableCell 
                            className="away-moneyline"
                            onClick={() => newAddBet(away_team, 'h2h')}
                            >
                            {getCellText(away_team, 'h2h')}
                        </TableCell>

                        <TableCell 
                            className="under"
                            onClick={() => newAddBet('Over', 'totals')}
                            >
                            o{getCellText('Over', 'totals')}
                        </TableCell>
                    </TableRow>

                    <TableRow className="home-row">
                        <TableCell>{home_team}</TableCell>
                        <TableCell 
                            className="home-spread"
                            onClick={() => newAddBet(home_team, 'spreads')}
                            >
                            {getCellText(home_team, 'spreads')}
                        </TableCell>

                        <TableCell 
                            className="home-moneyline"
                            onClick={() => newAddBet(home_team, 'h2h')}
                            >
                            {getCellText(home_team, 'h2h')}
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