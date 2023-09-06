import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styling
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function MarketsItem(prop) {

    const {game} = prop
    console.log(game)

    const bookmaker = game[0].bookmaker
    const home = {name: game[0].home_team}
    const away = {name: game[0].away_team}
    const commenceTime = game[0].commence_time
    
    const getSpread = team => {
        for (let market of game) {
            if (market.outcome === team.name && market.market === 'spreads') {
                return {point: market.point, price: market.price}
            }
        }
    }
    home.spread = getSpread(home)
    away.spread = getSpread(away)

    const getMoneyline = team => {
        for (let market of game) {
            if (market.outcome === team.name && market.market === 'h2h') {
                return market.price 
            }
        }
    }
    home.moneyline = getMoneyline(home)
    away.moneyline = getMoneyline(away)

    const getTotals = () => {
        let newTotal = {}
        for (let market of game) {
            if (market.market === 'totals' && market.outcome === 'Over') {
                newTotal.over = {point: market.point, price: market.price}
            }

            if (market.market === 'totals' && market.outcome === 'Under') {
                newTotal.under = {point: market.point, price: market.price}
            }
        }
        return newTotal 
    }

    const totals = getTotals()
    console.log(totals)

    console.log(home)

    return (<>
        <TableContainer>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Spread</TableCell>
                    <TableCell>Moneyline</TableCell>
                    <TableCell>Over/Under</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow>
                    <TableCell>{away.name}</TableCell>
                    <TableCell>{away.spread.point} ({away.spread.price})</TableCell>
                    <TableCell>{away.moneyline}</TableCell>
                    <TableCell>o{totals.over.point} ({totals.over.price})</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>{home.name}</TableCell>
                    <TableCell>{home.spread.point} ({home.spread.price})</TableCell>
                    <TableCell>{home.moneyline}</TableCell>
                    <TableCell>o{totals.under.point} ({totals.under.price})</TableCell>
                </TableRow>
            </TableBody>
            
        </TableContainer>
    </>)
}

export default MarketsItem