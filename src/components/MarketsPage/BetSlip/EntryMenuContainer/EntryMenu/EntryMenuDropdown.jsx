import { useState } from 'react';
import { useSelector } from 'react-redux';
import useStore from '../../../../../hooks/useStore';

// Style Components
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function EntryMenuDropdown({ props }) {
    const { selectedEntry, setSelectedEntry } = props;

    const entries = useStore("entries");

    const [anchorEl, setAnchorEl] = useState(null);

    const handleEntryClick = (index) => {
        setSelectedEntry(index);
        setAnchorEl(null);
    }

    return (
        <Grid item xs={12}>

            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                variant="contained"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(event) => setAnchorEl(event.currentTarget)}>
                {entries[selectedEntry].name}
            </Button>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {entries.map((entry, index) => (
                    <MenuItem
                        key={entry.id}
                        onClick={() => handleEntryClick(index)}
                        disableGutters={true}>
                        {entry.name}
                    </MenuItem>
                ))}
            </Menu>

        </Grid>
    )
}

export default EntryMenuDropdown