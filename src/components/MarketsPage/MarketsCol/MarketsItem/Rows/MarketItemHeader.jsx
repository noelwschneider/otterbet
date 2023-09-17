import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function MarketItemHeader( {game} ) {

    const { away, date, time, competition, home, id, markets } = game
    console.log('game:', game)
    console.log("date:", date)

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
            console.log('new minutes:', minutes)
        }

        return `${month}/${day} at ${hours}:${minutes}${segmentIndicator}`
    }
    let gameDate = getDateTimeData(date, time)

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)
    const user = useSelector(store => store.user)

    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main, 
        border: "solid 2px black",
    }));

    return (
    <ComponentTheme container item>
        <Grid item xs={6}>{gameDate}</Grid>
        <Grid item xs={2}>Spread</Grid>
        <Grid item xs={2}>ML</Grid>
        <Grid item xs={2}>O/U</Grid>
    </ComponentTheme>)
}

export default MarketItemHeader