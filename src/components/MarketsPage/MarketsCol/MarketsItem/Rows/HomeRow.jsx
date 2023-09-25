import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function HomeRow( {game} ) {

    const dispatch = useDispatch()
    const betslip = useSelector(store => store.betslip)
    const user = useSelector(store => store.user)

    const { away, date, time, competition, home, id, markets } = game

    //! Long-term, this might be better as its own component, which I just feed props and render accordingly. This component is currently a burden to read and not very flexible.
    const getCellText = (outcome, market) => {

        let cellArray = markets.filter(x => x.outcome === outcome && x.market === market)

        let [cellObject] = cellArray

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
            cellObject.point = `${Number(cellObject.point).toFixed(1)}`
        } else if (!cellObject.point) {
            cellObject.point = ''
        } else {
            console.log('some unforeseen value:', cellObject.point);
        }

        //& eventually let the user determine which odds format they prefer
        let cellString = `${cellObject.point} (${cellObject.price.american})`;

        cellObject.string = cellString;
        return cellObject;
    }

    // Handler function for adding markets to betslip
    const newAddBet = (outcome, market) => {

        //& Rename this variable
        for (let x of markets) {
            if (x.tag === `${outcome}_${market}`) {

                for (let bet of betslip) {
                    if (bet.id === x.id) {
                        return;
                    }
                }
                x.wager = 0;
                x.user = user.id;
                x.home_team = home;
                x.away_team = away;
                x.commence_date = date;
                x.commence_time = time;
                x.dateString = getDateTimeData(date, time);
                x.game_id = id;
                x.competition = competition;
                dispatch({ type: 'SET_BETSLIP', payload: x })
            }
        }
    }

    const getDateTimeData = (date, time) => {

        // UTC offset for central time right now
        //& eventually this will be a variable based on user's time zone
        const offset = -5;

        let month = Number(date[5] + date[6]);
        let day = Number(date[8] + date[9]);
        let hours = Number(time[0] + time[1]);
        let minutes = Number(time[3] + time[4]);

        // AM or PM
        //& There is probably a real-world name for this. My current name is not descriptive
        let segmentIndicator = ''
        
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
            hours = (hours + offset) - 24;
        } else {
            hours = hours + offset;
        }

        // Adjust to 12-hour format
        if (hours > 12) {
            hours -= 12;
        } 
        
        if (hours === 0 || hours < 12) {
            segmentIndicator = 'am';
        } else if (hours >= 12 && hours !== 24) {
            segmentIndicator = 'pm';
        }

        if (minutes < 10) {
            const minutesString = `${minutes}`;
            minutes = minutesString.padStart(2, 0);
        }

        return `${month}/${day} at ${hours}:${minutes}${segmentIndicator}`;
    }

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: "white",
        padding: "5px",
        border: "1px solid black",

        '.market-option': {
            display: "flex",
            flexDirection: "column",  
            alignItems: "center", 
            alignSelf: "center",
            justifyContent: "center",
            paddingBottom: "3px",
            border: "0px",
            borderRadius: "10px 10px 10px 10px",
            overflow: "hidden",
            backgroundClip: "border-box",
            height: "100%"
        },

        '.market-option:hover': {
            backgroundColor: "#e1e1e1",
            cursor: "pointer"
        } 
    }));

    return (
    <ComponentTheme container item>
        
        {/* TEAM */}
        <Grid item xs={6} style={{paddingLeft: "5px", alignSelf: "center"}}>{home}</Grid>
        
        {/* SPREAD */}
        <Grid className="market-option" 
            item 
            container 
            xs={2} 
            onClick={() => newAddBet(home, 'spreads')}
        >
            {/* Point */}
            <Grid item xs={6} style={{
                display: "flex", 
                justifyContent: "center", 
            }}>
                {getCellText(home, 'spreads').point}
            </Grid>

            {/* Price */}
            <Grid item xs={6} style={{display: "flex", justifyContent: "center"}}>
                ({getCellText(home, 'spreads').price.american})
            </Grid>
        </Grid>

        {/* MONEYLINE*/}
        <Grid className="market-option" item xs={2} onClick={() => newAddBet(home, 'h2h')} >
            {getCellText(home, 'h2h')}
        </Grid>

        {/* O/U Over value */}
        <Grid className="market-option"
            item 
            container 
            xs={2} 
            onClick={() => newAddBet('Under', 'totals')}>
            {/* Point */}
            <Grid item xs={6} style={{display: "flex", }}>
                {getCellText('Under', 'totals').point}
            </Grid>

            {/* Price */}
            <Grid item xs={6} style={{display: "flex", }}>
                ({getCellText('Under', 'totals').price.american})
            </Grid>
        </Grid>

    </ComponentTheme>)
}

export default HomeRow