import { useState } from 'react';
import { useSelector } from 'react-redux';

// Style Components
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