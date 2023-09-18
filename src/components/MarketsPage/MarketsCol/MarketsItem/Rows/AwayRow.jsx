import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function AwayRow( {game}) {
    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)
    const user = useSelector(store => store.user)

    const { away, date, time, competition, home, id, markets } = game


    // Get text for each cell of the Market Item
    //! Long-term, this might be better as its own component, which I just feed props and render accordingly. This component is currently a burden to read and not very flexible.
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

        cellObject.string = cellString 
        return cellObject
    }

    // Handler function for adding markets to betslip
    const newAddBet = (outcome, market) => {
    


        //& Rename this variable
        for (let x of markets) {
            if (x.tag === `${outcome}_${market}`) {
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
                x.commence_date = date
                x.game_id = id
                x.competition = competition
                dispatch({ type: 'SET_BETSLIP', payload: x })
            }
        }
    }

    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: "white"
    }));

    return (
    <ComponentTheme container item>
        <Grid item xs={6}>{away}</Grid>
        
        {/* SPREAD */}
        {/* Each cell needs an onHover setup */}
        <Grid 
            item 
            container 
            xs={2} 
            style={{
                flexDirection: "column"
            }}
            onClick={() => newAddBet(away, 'spreads')}>
            {/* Point */}
            <Grid item xs={6} >
                {getCellText(away, 'spreads').point}
            </Grid>

            {/* Price */}
            <Grid item xs={6}>
                ({getCellText(away, 'spreads').price.american})
            </Grid>
        </Grid>

        {/* MONEYLINE*/}
        <Grid item xs={2} onClick={() => newAddBet(away, 'h2h')}>
            {getCellText(away, 'h2h')}
        </Grid>

        {/* O/U Over value */}
        <Grid 
            item 
            container 
            xs={2} 
            style={{
                flexDirection: "column"
            }}
            onClick={() => newAddBet('Over', 'totals')}>
            {/* Point */}
            <Grid item xs={6}>
                {getCellText('Over', 'totals').point}
            </Grid>

            {/* Price */}
            <Grid item xs={6}>
                ({getCellText('Over', 'totals').price.american})
            </Grid>
        </Grid>

    </ComponentTheme>)
}

export default AwayRow

