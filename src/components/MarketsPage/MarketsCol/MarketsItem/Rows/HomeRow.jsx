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
            console.log('some unforeseen value:', cellObject.point)
        }

        //& eventually let the user determine which odds format they prefer
        let cellString = `${cellObject.point} (${cellObject.price.american})`

        cellObject.string = cellString 
        return cellObject
    }

    // Handler function for adding markets to betslip
    const newAddBet = (outcome, market) => {
        console.log('in newAddBet:', outcome, market)

        //& Rename this variable
        for (let x of markets) {
            if (x.tag === `${outcome}_${market}`) {
                // console.log('if has executed for', x)

                for (let bet of betslip) {
                    if (bet.id === x.id) {
                        console.log('duplicate wager, not sending to store')
                        return
                    }
                }
                x.wager = 0
                x.user = user.id
                x.home_team = home
                x.away_team = away
                x.commence_date = date
                x.commence_time = time
                x.dateString = getDateTimeData(date, time)
                x.game_id = id
                x.competition = competition
                console.log('state of new bet before sending', x)
                dispatch({ type: 'SET_BETSLIP', payload: x })
            }
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

        // Adjust to 12-hour format
        if (hours > 12) {
            hours -= 12
        } 
        
        if (hours === 0 || hours < 12) {
            segmentIndicator = 'am'
        } else if (hours >= 12 && hours !== 24) {
            segmentIndicator = 'pm'
        }

        if (minutes < 10) {
            const minutesString = `${minutes}`
            minutes = minutesString.padStart(2, 0)
        }

        return `${month}/${day} at ${hours}:${minutes}${segmentIndicator}`
    }

    // Custom theming
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: "white",
        paddingTop: "5px",
        paddingBottom: "5px",
        border: "1px solid black"
    }));

    return (
    <ComponentTheme container item>
        
        {/* TEAM */}
        <Grid item xs={6} style={{paddingLeft: "5px", alignSelf: "center"}}>{home}</Grid>
        
        {/* SPREAD */}
        <Grid 
            item 
            container 
            xs={2} 
            style={{
                flexDirection: "column",  
                alignItems: "center", 
                alignSelf: "center"
            }}
            onClick={() => newAddBet(home, 'spreads')}
        >
            {/* Point */}
            <Grid item xs={6} style={{display: "flex", justifyContent: "center"}}>
                {getCellText(home, 'spreads').point}
            </Grid>

            {/* Price */}
            <Grid item xs={6} style={{display: "flex", justifyContent: "center"}}>
                ({getCellText(home, 'spreads').price.american})
            </Grid>
        </Grid>

        {/* MONEYLINE*/}
        <Grid item  xs={2} onClick={() => newAddBet(home, 'h2h')} style={{display: "flex", justifyContent: "center", alignSelf: "center"}}>
            {getCellText(home, 'h2h')}
        </Grid>

        {/* O/U Over value */}
        <Grid 
            item 
            container 
            xs={2} 
            style={{
                flexDirection: "column",
                alignItems: "center",
                alignSelf: "center"
            }}
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