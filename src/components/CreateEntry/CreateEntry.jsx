import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styling
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

// Components
import CreateContest from '../CreateContest/CreateContest';


//! This is an unfinished component
//! I realized an easier solution for my immediate needs
//! I am keeping this because it is a fine start to something I will want to make later

function CreateEntry() {

    const dispatch = useDispatch()

    const [type, setType] = useState('sandbox')
    const [defaultEntry, setDefaultEntry] = useState(true)

    const handleType = (event) => {
        setType(event.target.value)
    }

    return (<>
        <Typography 
            variant="h2" 
            sx={{ paddingLeft: "19px" }}>
            Create New Entry
        </Typography>

        <FormControl>
            <InputLabel
                htmlFor="period-duration-label">
                Type
            </InputLabel>
            <Select label='Entry Type' onChange={handleType} value={type}>
                <MenuItem value={'sandbox'}>Sandbox</MenuItem>
                <MenuItem value={'contest'} disabled>Contest</MenuItem>
                <MenuItem value={'league'} disabled>League</MenuItem>
            </Select>
        </FormControl>

        <FormControlLabel
            control={<Checkbox checked={defaultEntry} onChange={() => setDefaultEntry(!defaultEntry)} />}
            label="Default entry?"
        />

        {type === 'sandbox' && 
            <CreateContest 
                type='sandbox' 
                defaultEntry={defaultEntry} 
            />
        }
    </>)
}

export default CreateEntry