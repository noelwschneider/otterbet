import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function MyBets() {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user)
    const userBets = useSelector(store => store.myBets)
    const entry = useSelector(store => store.entry)

    console.log('user bets:', userBets)

    useEffect(() => {
        dispatch({ type: 'FETCH_ENTRY' })
        dispatch({ type: 'FETCH_MYBETS', payload: user })
    }, [])

    const [selectedEntry, setSelectedEntry] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [entryView, setEntryView] = useState(true);
    const [alertMessage, setAlertMessage] = useState(false);

    const handleEntryClick = (index) => {
        setSelectedEntry(index);
        setAnchorEl(null)
    }

    const countBetsToRender = () => {
        let count = 0;
        for (let bet of userBets) {
            if (bet.entry_id === entry[selectedEntry].id
                && entryView ===
                !(bet.status === 'FT'
                    || bet.status === 'AOT')) {
                count++
            }
        }
        return count
    }
    let renderEmptyMessage = countBetsToRender()

    const renderWarning = () => {
        setAlertMessage(true)
    }

    const handleConfirm = () => {
        console.log('in handleConfirm')
        dispatch({ type: 'DELETE_ENTRY', payload: entry });
        setAlertMessage(false);
    };

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

                <br />
                <Button
                    variant="contained"
                    color="error"
                    onClick={renderWarning}
                >
                    Delete Entry
                </Button>

                {alertMessage && (
                    <Alert severity="warning">
                        <AlertTitle>Confirm Deletion</AlertTitle>
                        Are you sure you want to delete this entry?
                        
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleConfirm()}
                        >
                            Confirm
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => setAlertMessage(false)}
                        >
                            Cancel
                        </Button>
                        
                    </Alert>
                )}


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
                    {entry.map((entryItem, index) => (
                        <MenuItem
                            key={entryItem.id}
                            onClick={() => handleEntryClick(index)}
                            disableGutters={true}>
                            {entryItem.name}
                        </MenuItem>
                    ))}
                </Menu>

                <ToggleButtonGroup
                    value={entryView}
                    exclusive
                    onChange={(event, newValue) => setEntryView(newValue)}
                >
                    <ToggleButton value={true}>
                        <Typography variant="h6">
                            Upcoming
                        </Typography>
                    </ToggleButton>

                    <ToggleButton value={false}>
                        <Typography variant="h6">
                            Completed
                        </Typography>
                    </ToggleButton>
                </ToggleButtonGroup>

                {(renderEmptyMessage === 0 && entryView) && <>
                    <Typography variant="h3">No active bets.</Typography>
                    <Typography variant="h6">
                        Head to <Link to="/markets">Markets</Link> to view available lines.
                    </Typography>
                </>}

                {userBets.map(bet => {
                    return (
                        bet.entry_id === entry[selectedEntry].id
                            && entryView === !(bet.status === 'FT' || bet.status === 'AOT')
                            ? <MyBetsItem key={bet.id} bet={bet} />
                            : <></>
                    )
                })}
            </>
        }

    </>)
}

export default MyBets