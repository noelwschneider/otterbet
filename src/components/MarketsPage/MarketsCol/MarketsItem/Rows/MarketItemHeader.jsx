import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function MarketItemHeader( {game} ) {

    const { date, time } = game

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
        } else {
            hours = hours + offset
        }

        // Set 'am' or 'pm'
        if (hours === 0 || hours < 12) {
            segmentIndicator = 'am'
        } else if (hours >= 12 && hours !== 24) {
            segmentIndicator = 'pm'
        }

        // Adjust to 12-hour format
        if (hours > 12) {
            hours -= 12
        } 
        
        

        if (minutes < 10) {
            const minutesString = `${minutes}`
            minutes = minutesString.padStart(2, 0)
        }

        return `${month}/${day} at ${hours}:${minutes}${segmentIndicator}`
    }
    let gameDate = getDateTimeData(date, time)

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main, 
        border: "solid 2px black",
        fontWeight: "bold",
        paddingBottom: "2px",
        display: "flex"
    }));

    return (
    <ComponentTheme container item xs={12}>
        <Grid item xs={6} style={{paddingLeft: "5px"}}>{gameDate}</Grid>
        <Grid item xs={2} style={{display: "flex", justifyContent: "center"}}>Spread</Grid>
        <Grid item xs={2} style={{display: "flex", justifyContent: "center"}}>ML</Grid>
        <Grid item xs={2} style={{display: "flex", justifyContent: "center"}}>O/U</Grid>
    </ComponentTheme>)
}

export default MarketItemHeader