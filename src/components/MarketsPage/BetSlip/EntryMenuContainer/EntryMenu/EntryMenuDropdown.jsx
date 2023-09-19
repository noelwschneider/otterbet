import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function EntryMenuDropdown() {

    const entry = useSelector(store => store.entry)

    const [selectedEntry, setSelectedEntry] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleEntryClick = (index) => {
        setSelectedEntry(index);
        setAnchorEl(null)
    }

    // Custom theming
    const theme = useTheme()
    //! CHANGE TO APPROPRIATE COMPONENT
    const ComponentTheme = styled('div')(({ theme }) => ({

    }));

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                variant="contained"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                {entry[selectedEntry].name}
            </Button>

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
            </>
    )
}

export default EntryMenuDropdown