import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

// Components
import MyBetsItem from './MyBetsItem';
import EntryMenu from './EntryMenu';
import CreateEntry from '../CreateEntry/CreateEntry';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Styling
import Grid from '@mui/material/Grid';
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


    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: theme.palette.secondary.light,
        padding: "10px 0px 0px 20px",
        height: "100%",
    }));

    return (<ComponentTheme container>
        {entry.length === 0
            ? <></>
            : 
            <Grid item xs={3.5} style={{height: "100%"}}>
                <Typography variant="h2" sx={{ paddingLeft: "19px" }}>My Bets</Typography>

                <Grid item xs="12">
                    <EntryMenu />
                </Grid>
                
                <span>
                    <Typography variant="h5" style={{padding: "10px 0px"}}>
                        <strong>Available funds: </strong>
                        ${Number(entry[selectedEntry].funds).toFixed(2)}
                    </Typography>

                </span>

                {/* <Menu
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
                </Menu> */}

                <ToggleButtonGroup
                    value={entryView}
                    exclusive
                    onChange={(event, newValue) => setEntryView(newValue)}
                    style={{border: "1px solid black", width: "99%"}}
                >
                    <ToggleButton value={true} 
                    style={{
                        backgroundColor: entryView 
                            ? theme.palette.primary.main
                            : theme.palette.primary.light,
                        width: "50%",
                        border: "0px solid black",
                    }}>
                        <Typography variant="h6" >
                            Upcoming
                        </Typography>
                    </ToggleButton>

                    <ToggleButton value={false} 
                    style={{
                        backgroundColor: entryView 
                            ? theme.palette.primary.light 
                            : theme.palette.primary.main,
                        width: "51%",
                        borderLeft: "1px solid black",
                    }}
                    >
                        <Typography variant="h6" >
                            Completed
                        </Typography>
                    </ToggleButton>
                </ToggleButtonGroup>

                {(renderEmptyMessage === 0 && entryView) && 
                <div style={{height: "100%", paddingBottom: "100%", marginTop: "20px"}}>
                    <Typography variant="h3">No active bets.</Typography>
                    <Typography variant="h6">
                        Head to <Link to="/markets">Markets</Link> to view available lines.
                    </Typography>
                </div>}

                {userBets.map(bet => {
                    return (
                        (bet.entry_id === entry[selectedEntry].id
                            && entryView === !(bet.status === 'FT' || bet.status === 'AOT'))
                            && <MyBetsItem key={bet.id} bet={bet} />     
                    )
                })}
                </Grid>
        }
        
</ComponentTheme>)
}

export default MyBets