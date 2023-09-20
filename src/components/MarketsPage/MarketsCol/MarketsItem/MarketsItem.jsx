import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

// Components
import MarketItemHeader from './Rows/MarketItemHeader';
import HomeRow from './Rows/HomeRow';
import AwayRow from './Rows/AwayRow';

function MarketsItem({ game }) {

    const { markets } = game

    // Add tags to each market for matching to table cell
    for (let market of markets) {
        market.tag = `${market.outcome}_${market.market}`
    }

    // Custom theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        width: "45vw",
        margin: "10px"
    }));

    return (
    <ComponentTheme container>

        <Grid container>
            <MarketItemHeader game={game}/>
            <AwayRow game={game}/>
            <HomeRow game={game}/>
        </Grid>
            
    </ComponentTheme>
    )
}

export default MarketsItem