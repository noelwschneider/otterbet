import React from 'react';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function ItemInfoDropdown(props) {

    const { bet } = props
    const { 
        away_team, 
        commence_time, 
        commence_date, 
        home_team, 
        market, 
        price 
    } = bet

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
        let segmentIndicator = '';

        // Adjust for user timezone
        //& This does not currently have any validation for month (or year) crossover
            //& e.g. rendering January 1st vs December 31st depending on timezone
        if (hours + offset < 0) {
            // Move day back
            day--;
            // Adjust time
            hours = 24 + (hours + offset);

        } else if (hours + offset > 24) {
            // Move day forward
            day++;

            // Adjust time
            hours = (hours + offset) - 24
        } else {
            hours = hours + offset;
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

            {/* '{away} at {home}' */}
            <Grid item xs={12}>
                <Typography variant="caption">
                    {gameInfo}
                </Typography>
            </Grid>

            {/* Date and time */}
            <Grid item xs={12}>
                <Typography variant="caption">
                    {dateString}
                </Typography>
            </Grid>

            {/* Market type */}
            <Grid item xs={12}>
                <Typography variant="caption">
                    {formattedMarket} ({price.american})
                </Typography>
            </Grid>

        </Grid>
    )
}

export default ItemInfoDropdown