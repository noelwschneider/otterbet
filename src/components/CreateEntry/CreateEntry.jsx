import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styling
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//! This is an unfinished component
//! I realized an easier solution for my immediate needs
//! I am keeping this because it is a fine start to something I will want to make later

function CreateEntry() {

    const dispatch = useDispatch()

    // Type
        // Sandbox
        // Contest
        // League
    // IF SANDBOX
        // Funds (entry.funds)
        // Default entry? entry.default_entry
    // SANDBOX / LEAGUE
        // leagues
            // nfl
            // ncaa fb
            // nba
            // wnba
            // ncaa mbb
            // ncaa wbb
            // mlb
            // nhl
            // epl
        // markets
            // spreads
            // h2h
            // over/under
        // configuration
            // start date
            // period duration
            // period fund
            // max users (league only)
            // max entries (league only)

        const [type, setType] = useState('')

        const handleType = (event) => {
            setType(event.target.value)
        }

            

    return(<>
        <FormControl>
            <Select label='Entry Type' onChange={handleType} value={type}>
                <MenuItem value={'sandbox'}>Sandbox</MenuItem>
                <MenuItem value={'contest'} disabled>Contest</MenuItem>
                <MenuItem value={'league'} disabled>League</MenuItem>
            </Select>
        </FormControl>
        
    </>)
}

export default CreateEntry