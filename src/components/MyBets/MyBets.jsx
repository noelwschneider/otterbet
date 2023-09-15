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
import Menu from '@mui/material/Menu';

import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function MyBets() {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user)
    const userBets = useSelector(store => store.myBets)
    const entry = useSelector(store => store.entry)

    useEffect(() => {
        dispatch({ type: 'FETCH_ENTRY' })
        dispatch({ type: 'FETCH_MYBETS', payload: user })
    }, [])

    const [selectedEntry, setSelectedEntry] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleEntryClick = (index) => {
        setSelectedEntry(index);
        setAnchorEl(null)
        
    }

    userBets.map( bet => {
        console.log(bet.entry_id)
        console.log(entry[selectedEntry].id)
        console.log(bet.entry_id === entry[selectedEntry].id)
    })

    return (<>
        {entry.length === 0
            ? <></>
            : <>
                <Typography variant="h2" sx={{ paddingLeft: "19px" }}>My Bets</Typography>
                
                <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        variant="contained"
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        {entry[selectedEntry].name}
                    </Button>

                    <span>
                        <Typography variant="h5">
                            <strong>Available funds: </strong>
                            ${Number(entry[selectedEntry].funds).toFixed(2)}
                        </Typography>
                        
                    </span>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {entry.map( (entryItem, index) => (
                            <MenuItem 
                                key={entryItem.id}
                                onClick={() => handleEntryClick(index)}
                                disableGutters={true}>
                                    {entryItem.name}
                            </MenuItem>
                        ))}
                    </Menu>

                {userBets.map(bet => {
                    return bet.entry_id === entry[selectedEntry].id
                    ? <MyBetsItem key={bet.id} bet={bet} />
                    : <></>
                })}
            </>
        }

    </>)
}

export default MyBets