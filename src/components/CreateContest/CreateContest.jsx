import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styling
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';

function CreateContest(props) {
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)

    const { type, defaultEntry } = props

    // Leagues
    const [nfl, setNfl] = useState(true);
    const [ncaaFb, setNcaaFb] = useState(true);
    const [nba, setNba] = useState(true);
    const [wnba, setWnba] = useState(true);
    const [ncaaMbb, setNcaaMbb] = useState(true);
    const [ncaaWbb, setNcaaWbb] = useState(true);
    const [mlb, setMlb] = useState(true);
    const [nhl, setNhl] = useState(true);
    const [epl, setEpl] = useState(true);

    // Markets
    const [spreads, setSpreads] = useState(true);
    const [h2h, setH2h] = useState(true);
    const [overUnder, setOverUnder] = useState(true);

    // Configuration
    const [periodDuration, setPeriodDuration] = useState('weekly');
    const [periodFund, setPeriodFund] = useState(1000);
    const [minWager, setMinWager] = useState(0)
    const [maxUsers, setMaxUsers] = useState(1); // League only

    const sendContestData = () => {
        const timeNow = new Date().toUTCString()

        let id = user.id + '_' + timeNow
        const contestData = {
            id,
            type,
            defaultEntry,
            periodDuration,
            periodFund,
            type,
            maxUsers,
            nfl,
            ncaaFb,
            nba,
            wnba,
            ncaaMbb,
            ncaaWbb,
            mlb,
            nhl,
            epl,
            spreads,
            h2h,
            overUnder,
        };

        dispatch({ type: 'CREATE_CONTESNT', payload: contestData })
    };

    return (<>

        {/* Configuration */}
        <Typography variant='h4'>Contest settings:</Typography>

        <FormControl>
            <InputLabel
                htmlFor="period-duration-label">
                Period Duration
            </InputLabel>

            <Select
                labelId="period-duration-label"
                id="period-duration"
                value={periodDuration}
                onChange={(event) => setPeriodDuration(event.target.value)}
                label="Period Duration"
            >
                <MenuItem value={'daily'}>Daily</MenuItem>
                <MenuItem value={'weekly'}>Weekly</MenuItem>
                <MenuItem value={'monthly'}>Monthly</MenuItem>
            </Select>
        </FormControl>

        <FormControl variant="outlined">
            <TextField
                label="Period funds"
                value={periodFund}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0 }
                }}
                onChange={() => setPeriodFund(event.target.value)}
            />
        </FormControl>

        <FormControl variant="outlined">
            <TextField
                label="Minimum wager"
                value={minWager}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0 },
                }}
                onChange={(event) => setMinWager(event.target.value)}
            />
        </FormControl>

        {type !== 'sandbox' && <>
            <FormControl variant="outlined">
                <InputLabel htmlFor="max-users">Max Users</InputLabel>
                <Select
                    label="Max Users"
                    value={maxUsers}
                    onChange={event => setMaxUsers(event.target.value)}
                    inputProps={{
                        name: 'maxUsers',
                        id: 'max-users',
                    }}
                >
                    {[...Array(12)].map((_, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>}


        {/* Leagues */}
        <Typography variant='h4'>Bettable Leagues</Typography>
        <FormControlLabel
            control={<Checkbox checked={nfl} onChange={() => setNfl(!nfl)} />}
            label="NFL"
        />

        <FormControlLabel
            control={<Checkbox checked={ncaaFb} onChange={() => setNcaaFb(!ncaaFb)} />}
            label="NCAA Football"
        />

        <FormControlLabel
            control={<Checkbox checked={nba} onChange={() => setNba(!nba)} />}
            label="NBA"
        />

        <FormControlLabel
            control={<Checkbox checked={wnba} onChange={() => setWnba(!wnba)} />}
            label="WNBA"
        />

        <FormControlLabel
            control={<Checkbox checked={ncaaMbb} onChange={() => setNcaaMbb(!ncaaMbb)} />}
            label="NCAA Men's Basketball"
        />

        <FormControlLabel
            control={<Checkbox checked={ncaaWbb} onChange={() => setNcaaWbb(!ncaaWbb)} />}
            label="NCAA Women's Basketball"
        />

        <FormControlLabel
            control={<Checkbox checked={mlb} onChange={() => setMlb(!mlb)} />}
            label="MLB"
        />

        <FormControlLabel
            control={<Checkbox checked={nhl} onChange={() => setNhl(!nhl)} />}
            label="NHL"
        />

        <FormControlLabel
            control={<Checkbox checked={epl} onChange={() => setEpl(!epl)} />}
            label="Premier League"
        />

        {/* Markets */}
        <Typography variant='h4'>Bettable Markets</Typography>
        <FormControlLabel
            control={<Checkbox checked={spreads} onChange={() => setSpreads(!spreads)} />}
            label="Spreads"
        />

        <FormControlLabel
            control={<Checkbox checked={h2h} onChange={() => setH2h(!h2h)} />}
            label="Head to Head"
        />

        <FormControlLabel
            control={<Checkbox checked={overUnder} onChange={() => setOverUnder(!overUnder)} />}
            label="Over/Under"
        />
    </>)
}

export default CreateContest