import React from 'react';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Styling Components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

function MyBetsItem(props) {
    const {bet, view} = props
    console.log('view', view)
    let {
        away, 
        date, 
        time, 
        home, 
        market, 
        outcome, 
        point, 
        price, 
        wager, 
        result
    } = bet

    const convertToAmerican = price => {
        let num = price - 1
        
        if (price >= 2) {
          num *= 100
          num = Math.round(num)
          num = `+${num}`
        }
        
        if (price < 2) {
          num = 1 / num
          num *= 100
          num = Math.round(num)
          num = `-${num}`
        }
        return num
    }
    price = {european: price, american: convertToAmerican(price)}

    const getCellText = ( market) => {

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
            newPoint =  ''
        } else {
            console.log('some unforeseen value:', newPoint)
        }

        //& eventually let the user determine which odds format they prefer
        let cellString = `${newPoint} (${price.american})`

        return cellString
    }
    const cellText = getCellText( market)
    
    const winStyle = () => {
        if (view) {
            return {
                fontWeight: "bold"
            }
        } else if (result === true) {
            return {
                color: "green",
                fontWeight: "bold"
            }
        } else if (result === false) {
            return {
                // fontWeight: "bold",
                textDecoration: "line-through",
                fontStyle: "italic"
            }
        } else if (result === null) {
            return {fontWeight: "bold"}
        }
    }

    const loseStyle = () => {
        if (view) {
            return {
                fontWeight: "bold"
            }
        } else if (result === true) {
            return {
                textDecoration: "line-through",
                fontStyle: "italic"
            }
        } else if (result === false) {
            return {
                color: "red",
                fontWeight: "bold"
            }
        } else if (result === null) {
            return {fontWeight: "bold"}
        }
    }

    const getDateTimeData = (date, time) => {

        // UTC offset for central time right now
        //& eventually this will be a variable
        const offset = -5 

        let month = Number(date[5] + date[6])
        let day = Number(date[8] + date[9])
        let hours = Number(time[0] + time[1])
        let minutes = Number(time[3] + time[4])

        console.log(`time at enter: ${month}/${day} at ${hours}:${minutes}`)
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

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: theme.palette.secondary.light
    }));

    return (<>
        <ComponentTheme container>
            <Card 
            sx={{
                backgroundColor: theme.palette.primary.contrastText,
                width: "300px",
                margin: "10px 0px 10px 0px",
                border: "1px solid black",
                boxShadow: "1px",
                padding: "10px"
            }}>

            <Typography variant="h6" sx={{fontWeight: "bold",}}>{outcome} {cellText}</Typography>

            {/* <Typography variant="subtitle2" sx={{fontWeight: "lighter", fontStyle: "italic"}}>{market}</Typography> */}

            <Typography variant="subtitle1" sx={{fontWeight: "lighter", fontStyle: "italic"}}>{away} at {home}</Typography>

            <Typography variant="subtitle1" sx={{fontWeight: "lighter", fontStyle: "italic"}}>{getDateTimeData(date, time)}</Typography>

            <Typography variant="h6" sx={loseStyle}>Wager: ${Number(wager).toFixed(2)}</Typography>

            <Typography variant="h6" sx={winStyle}>Payout: ${(Number(wager) * (price.european)).toFixed(2)}</Typography>
            
            </Card>
        </ComponentTheme>
    </>)
}

export default MyBetsItem