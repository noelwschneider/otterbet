import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ItemInfoDropdown(props) {

    console.log('props:', props)

    const { bet } = props
    const { away_team, commence_time, commence_date, competition, game_id, home_team, id, last_update, market, outcome, point, price, tag, user, wager } = bet



    const gameInfo = `${away_team} at ${home_team}`


    const getDateTimeData = (date, time) => {

        // UTC offset for central time right now
        //& eventually this will be a variable
        const offset = -5

        let month = Number(date[5] + date[6])
        let day = Number(date[8] + date[9])
        let hours = Number(time[0] + time[1])
        let minutes = Number(time[3] + time[4])

        // AM or PM
        //& There is probably a real-world name for this. My current name is not descriptive

        let segmentIndicator = ''
        // Adjust for user timezone
        //& This does not currently have anything for month crossover
        if (hours + offset < 0) {
            // Move day back
            day--
            // Adjust time
            hours = 24 + (hours + offset)

        } else if (hours + offset > 24) {
            // Move day forward
            day++

            // Adjust time
            hours = (hours + offset) - 24
        }

        // Adjust to 12-hour format
        if (hours > 12) {
            hours -= 12
            segmentIndicator = 'pm'
        } else if (hours <= 12) {
            segmentIndicator = 'am'
        }

        if (minutes < 10) {
            const minutesString = `${minutes}`
            minutes = minutesString.padStart(2, 0)
        }

        return `${month}/${day} at ${hours}:${minutes}${segmentIndicator}`
    }
    const dateString = getDateTimeData(commence_date, commence_time)

    const formatMarket = (market) => {
        if (market === "spreads") {
            return "Point spread"
        } else if (market === 'h2h') {
            return "Moneyline"
        } else if (market === 'totals') {
            return 'Over/Under'
        }
    }
    const formattedMarket = formatMarket(market)

    return (
        <Grid container item xs={12}>

            {/* Market type */}
            <Grid item xs={12}>
                <Typography variant="caption">
                    {formattedMarket} ({price.american})
                </Typography>

            </Grid>

            {/* '{away} at {home}' */}
            <Grid item xs={12}>
                <Typography variant="caption">
                    {gameInfo}
                </Typography>

            </Grid>

            <Grid item xs={12}>
                <Typography variant="caption">
                    {dateString}
                </Typography>

            </Grid>

            <Grid item xs={12}>
                <Typography variant="caption">
                    What does this mean?
                </Typography>
            </Grid>

        </Grid>
    )
}

export default ItemInfoDropdown