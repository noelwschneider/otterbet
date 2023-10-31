import { useState } from 'react';
import useStore from '../../hooks/useStore';

// Styling
import {
  Grid,
  MenuItem,
  Menu,
  Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function EntryMenu({props}) {
  const {
    selectedEntryIndex, 
    setSelectedEntryIndex,
  } = props;

  const entries = useStore("entries");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleEntryClick = (index) => {
    setSelectedEntryIndex(index);
    setAnchorEl(null);
  }

  return (
    <Grid item xs={12}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="contained"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        style={{ width: "99%" }}
      >
        {entries[selectedEntryIndex].name}
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        disableGutter={true}
      >
        {entries.map((entryItem, index) => (
          <MenuItem
            key={entryItem.id}
            onClick={() => handleEntryClick(index)}
            disableGutters={true}
            style={{ width: "322px" }}
          >
            {entryItem.name}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  )
}