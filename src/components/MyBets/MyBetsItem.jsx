import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styling
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
    const {bet} = props
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
        if (result === true) {
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
        if (result === true) {
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

    return (<>
        <Box 
        sx={{

        }}
            className="container" 
    >
        <Card sx={{overflow: "scroll",}}>
           <Typography variant="h6" sx={{fontWeight: "bold",}}>{outcome} {cellText}</Typography>

           {/* <Typography variant="subtitle2" sx={{fontWeight: "lighter", fontStyle: "italic"}}>{market}</Typography> */}

           <Typography variant="subtitle1" sx={{fontWeight: "lighter", fontStyle: "italic"}}>{away} at {home}</Typography>

           <Typography variant="subtitle1" sx={{fontWeight: "lighter", fontStyle: "italic"}}>{date} {time}</Typography>

           <Typography variant="h6" sx={loseStyle}>Wager: ${Number(wager).toFixed(2)}</Typography>

           <Typography variant="h6" sx={winStyle}>To win: ${(Number(wager) * (price.european - 1)).toFixed(2)}</Typography>
           
        </Card>
    </Box>
    </>)
}

export default MyBetsItem