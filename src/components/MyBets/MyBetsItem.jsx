import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Styling Components
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function MyBetsItem(props) {
    const {bet, view} = props
    console.log('view', view)
    let {away, date, time, game_id, home, id, market, outcome, point, price, wager, result} = bet

    const convertToAmerican = price => {
        // console.log('price is:', price)
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
        // console.log('num to return is:', num)
        return num
    }
    price = {european: price, american: convertToAmerican(price)}

    const getCellText = (outcome, market) => {

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
        // console.log('cell string:', cellString)

        return cellString
    }
    const cellText = getCellText(outcome, market)

    const getColor = bet => {
        if (result === true) {
            return "green"
        } else if (result === false) {
            return "red"
        }
    }
    let statusColor = getColor()
    
    const winStyle = bet => {
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

    const loseStyle = bet => {
        if (view) {
            return {
                fontWeight: "bold"
            }
        } else if (result === true) {
            return {
                // fontWeight: "bold",
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
            // console.log('hours+ offset < 0condition met')
            // Move day back
            day--
            // Adjust time
            hours = 24 + (hours + offset)
            // console.log('adjusted day:', day)
            // console.log('adjusted hours:', hours)
        } else if (hours + offset > 24) {
            // Move day forward
            day++
            
            // Adjust time
            hours = (hours + offset) - 24
        } else {
            hours = hours + offset
            console.log('hours:', hours)
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