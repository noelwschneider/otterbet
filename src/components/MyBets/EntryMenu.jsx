import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Styling
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function EntryMenu() {

    const entry = useSelector(store => store.entry)

    const [selectedEntry, setSelectedEntry] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleEntryClick = (index) => {
        setSelectedEntry(index);
        setAnchorEl(null)
    }

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