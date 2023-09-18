import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

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

function EntryMenu() {

    const user = useSelector(store => store.user)
    const userBets = useSelector(store => store.myBets)
    const entry = useSelector(store => store.entry)

    const [selectedEntry, setSelectedEntry] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [entryView, setEntryView] = useState(true);

    const handleEntryClick = (index) => {
        setSelectedEntry(index);
        setAnchorEl(null)
    }

    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({

    }));

    return (<>
        <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(event) => setAnchorEl(event.currentTarget)}
            style={{ width: "99%" }}
        >
            {entry[selectedEntry].name}
        </Button>
        
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            disableGutter={true}
        >
            {entry.map((entryItem, index) => (
                <MenuItem
                    key={entryItem.id}
                    onClick={() => handleEntryClick(index)}
                    disableGutters={true}
                    style={{width: "322px"}}
                    >
                    {entryItem.name}
                </MenuItem>
            ))}
        </Menu>
    </>
    )
}

export default EntryMenu