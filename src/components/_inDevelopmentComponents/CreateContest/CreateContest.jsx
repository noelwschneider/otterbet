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
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function CreateContest(props) {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(store => store.user)

    let { type } = props

    // Configuration
    const [entry_name, setEntryName] = useState('')
    const [privacy, setPrivacy] = useState(true)
    const [period_duration, setPeriodDuration] = useState('weekly');
    const [period_fund, setPeriodFund] = useState(1000);
    const [period_count, setPeriodCount] = useState(0);
    const [min_wager, setMinWager] = useState(1);
    const [max_users, setMaxUsers] = useState(1);

    // Eventually, set the start date by finding the nearest Monday
        // Also maybe give an option for a short or long week if start date is set to the current date
    const today = new Date()
    const makeDateString = (date) => {
        return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
    }
    const [contest_start, setStartDate] = useState(makeDateString(today))

    // Leagues
    const [nfl, setNfl] = useState(true);
    const [ncaa_fb, setNcaaFb] = useState(true);
    const [nba, setNba] = useState(true);
    const [wnba, setWnba] = useState(true);
    const [ncaa_mbb, setNcaaMbb] = useState(true);
    const [ncaa_wbb, setNcaaWbb] = useState(true);
    const [mlb, setMlb] = useState(true);
    const [nhl, setNhl] = useState(true);
    const [epl, setEpl] = useState(true);

    // Markets
    const [spreads, setSpreads] = useState(true);
    const [h2h, setH2h] = useState(true);
    const [over_under, setOverUnder] = useState(true);

    const getAnnualPeriods = (duration) => {
        switch (duration) {
            case 'monthly':
                return 13;
            case 'weekly':
                return 53;
            case 'daily':
                return 366;
            default:
                return 0;
        }
    }

    const formatContestData = () => {
        // Create contest ID
        const timeNow = new Date().toUTCString()
        let contest_id = user.id + '_' + timeNow

        // Set league type
        type = !type ? 'league' : type

        // Format period_duration
        const convertDuration = (x) => {
            switch(x) {
                case 'daily':
                    return '0 month 1 day';
                case 'weekly': 
                    return '0 month 7 day';
                case 'monthly':
                    return '1 month';
                default:
                    return null;

            }
        }

        const contestData = {
            user_id: user.id,
            entry_name,
            contest_id,
            type,
            contest_start,
            period_duration: convertDuration(period_duration),
            period_fund,
            period_count,
            max_users,
            min_wager,
            nfl,
            ncaa_fb,
            nba,
            wnba,
            ncaa_mbb,
            ncaa_wbb,
            mlb,
            nhl,
            epl,
            spreads,
            h2h,
            over_under,
        };
        sendContestData(contestData)

        history.push('/my-bets')
    };

    const sendContestData = (data) => {
        dispatch({ type: 'CREATE_CONTEST', payload: data })
    }
    
    return (<>
        {/* Configuration */}
        <Typography variant='h4'>Contest settings:</Typography>

        <FormControl variant="outlined">
            <TextField
                label="Entry Name"
                required
                value={entry_name}
                onChange={() => setEntryName(event.target.value)}
            />
        </FormControl>

        {!type && (<>
            <FormControl>
            <InputLabel
                htmlFor="privacy-label">
                Privacy
            </InputLabel>

            <Select
                labelId="privacy-label"
                id="privacy"
                value={privacy}
                onChange={(event) => setPrivacy(event.target.value)}
                label="Period Duration"
            >
                <MenuItem default value={true}>Private</MenuItem>
                <MenuItem value={false}>Public</MenuItem>
            </Select>
            </FormControl>
        </>)}
        

        <FormControl>
            <InputLabel
                htmlFor="period-duration-label">
                Period Duration
            </InputLabel>

            <Select
                labelId="period-duration-label"
                id="period-duration"
                value={period_duration}
                onChange={(event) => setPeriodDuration(event.target.value)}
                label="Period Duration"
            >
                <MenuItem value={'daily'}>Daily</MenuItem>
                <MenuItem value={'weekly'}>Weekly</MenuItem>
                <MenuItem value={'monthly'}>Monthly</MenuItem>
            </Select>
        </FormControl>

        {type !== 'sandbox' && <>
            <FormControl variant="outlined">
                <InputLabel htmlFor="period-count"># of Periods</InputLabel>
                <Select
                    label="Period count"
                    value={period_count}
                    onChange={event => setPeriodCount(event.target.value)}
                    inputProps={{
                        name: 'periodCount',
                        id: 'period-count',
                    }}
                >
                    {[...Array(getAnnualPeriods(period_duration))].map((_, index) => (
                        <MenuItem key={index} value={index}>
                            {index === 0 ? 'No limit' : index}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>}

        <FormControl variant="outlined">
            <TextField
                label="Period funds"
                value={period_fund}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0, max: 1000000 }
                }}
                onChange={() => setPeriodFund(event.target.value)}
            />
        </FormControl>

        <FormControl variant="outlined">
            <TextField
                label="Minimum wager"
                value={min_wager}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0, max: period_fund },
                }}
                onChange={(event) => setMinWager(event.target.value)}
            />
        </FormControl>

        {type !== 'sandbox' && <>
            <FormControl variant="outlined">
                <InputLabel htmlFor="max-users">Max Users</InputLabel>
                <Select
                    label="Max Users"
                    value={max_users}
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

        


        {/* LEAGUES */}
        {/* <Typography variant='h4'>Bettable Leagues</Typography>
        <FormControlLabel
            control={<Checkbox checked={nfl} onChange={() => setNfl(!nfl)} />}
            label="NFL"
        />

        <FormControlLabel
            control={<Checkbox checked={ncaa_fb} onChange={() => setNcaaFb(!ncaa_fb)} />}
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
            control={<Checkbox checked={ncaa_mbb} onChange={() => setNcaaMbb(!ncaa_mbb)} />}
            label="NCAA Men's Basketball"
        />

        <FormControlLabel
            control={<Checkbox checked={ncaa_wbb} onChange={() => setNcaaWbb(!ncaa_wbb)} />}
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
        /> */}

        {/* Markets */}
        {/* <Typography variant='h4'>Bettable Markets</Typography>
        <FormControlLabel
            control={<Checkbox checked={spreads} onChange={() => setSpreads(!spreads)} />}
            label="Spreads"
        />

        <FormControlLabel
            control={<Checkbox checked={h2h} onChange={() => setH2h(!h2h)} />}
            label="Head to Head"
        />

        <FormControlLabel
            control={<Checkbox checked={over_under} onChange={() => setOverUnder(!over_under)} />}
            label="Over/Under"
        /> */}

        <br/>
        <br/>

        <Button 
            variant="contained" 
            disableRipple
            onClick={formatContestData}>
                Submit
        </Button>
    </>)
}

export default CreateContest