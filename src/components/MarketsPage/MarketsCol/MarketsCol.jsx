import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import MarketsItem from './MarketsItem/MarketsItem';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import InfoIcon from '@mui/icons-material/Info';

function MarketsCol() {
    const dispatch = useDispatch()

    //& Static dates for development purposes. Refactor into dynamic feature
    const [startDate, setStartDate] = useState('2023-09-13')
    const [endDate, setEndDate] = useState('2023-09-20')

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const dateRange = {
        startDate,
        endDate
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_ODDS', payload: dateRange })
    }, [])

    const markets = useSelector(store => store.odds)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>

        <Typography variant="h2" style={{ display: "inline-flex" }}>NFL</Typography>
        <IconButton>
            <InfoIcon aria-describedby={id} variant="contained" onClick={handleClick} />
        </IconButton>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            style={{width: "800px"}}
        >
            <Typography variant="caption" ><strong>Spread:</strong> A handicap, or the margin of victory. A negative number means the team needs to win by at least that amount for the wager to succeed. A positive number means the team must finish within that margin of the opposing team.</Typography>
            <br/>
            <br/>
            <Typography variant="caption" ><strong>ML:</strong> The "moneyline", this bet will succeed if the selected team wins the game. It is the same as a spread of 0.0.</Typography>
            <br/>
            <br/>
            <Typography variant="caption" ><strong>O/U:</strong> The over/under, this is a wager on the total points scored by both teams. The "over" will succeed if the teams combine for more than this number, while the "under" will succeed if they score less.</Typography>
            <br/>
            <br/>
            <Typography variant="caption" >What if the game ends at the exact score of the spread or the over/under? You get your initial wager back, but nothing more.</Typography>
            <br/>
            <br/>
            <Typography variant="caption" >What are those numbers beside the wagers, such as <strong>"-110"</strong> or <strong>"+200"</strong>? These show how much money you win (in addition to getting back your initial wager) if the bet succeeds. A positive number represents <strong>how much you would net if you wagered $100</strong>, while a negative number represents <strong>how much you would need to wager to net $100.</strong></Typography>

        </Popover>
        {/* Market items render here */}
        {markets.map(game => (
            <MarketsItem key={game.id} game={game} />
        ))}

    </>)
}

export default MarketsCol 