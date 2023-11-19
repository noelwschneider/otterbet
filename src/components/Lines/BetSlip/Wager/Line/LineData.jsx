// Style
import {
    Grid,
    Typography,
} from '@mui/material';

const { formatMarket, formatTimestamp } = require('../../../../../utilities/_utilities');

export default function LineData({ bet }) {
    const {
        away_team,
        commence_time,
        commence_date,
        home_team,
        market,
        price
    } = bet;

    return (
        <Grid container item xs={12}>

            <Grid 
            item xs={12} 
            component={Typography} 
            variant="caption" 
            children={`${away_team} at ${home_team}`}/>

            <Grid 
            item xs={12} 
            component={Typography} 
            variant="caption" 
            children={formatTimestamp(commence_date, commence_time)}/>           

            <Grid 
            item xs={12} 
            component={Typography} 
            variant="caption" 
            children={`${formatMarket(market)} (${price.american})`}/>

        </Grid>
    )
}