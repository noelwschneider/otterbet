import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import MyBetsItem from './MyBetsItem';
import CreateEntry from '../CreateEntry/CreateEntry';

// Styling
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function MyBets() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_MYBETS', payload: user})
    }, [])

    const user = useSelector(store => store.user)
    const userBets = useSelector(store => store.myBets)
    const entry = useSelector(store => store.entry)


    return (<>
        <FormControl>
            <InputLabel
                htmlFor="privacy-label">
                Privacy
            </InputLabel>

            <Select
                labelId="privacy-label"
                id="entry"
                value={entry}
                onChange={() => console.log('hi')}
                label="Period Duration"
            >
                <MenuItem default value={true}>Private</MenuItem>
                <MenuItem value={false}>Public</MenuItem>
            </Select>
            </FormControl>
        <Typography variant="h2" sx={{paddingLeft: "19px"}}>My Bets</Typography>
        {userBets.map( bet => (
            <MyBetsItem key={bet.id} bet={bet}/>
        ))}
    </>)
}

export default MyBets