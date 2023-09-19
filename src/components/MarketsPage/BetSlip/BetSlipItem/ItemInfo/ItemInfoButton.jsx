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
import IconButton from '@mui/material/IconButton';


function ItemInfoDropdown(props) {

    const { bet } = props
    const { away_team, commence_time, competition, game_id, home_team, id, last_update, market, outcome, point, price, tag, user, wager } = bet

    const [anchorEl, setAnchorEl] = useState(null);

    const handleEntryClick = (index) => {
        setAnchorEl(null)
    }

    const gameInfo = `${away_team} at ${home_team}`
    //! I need a formatted timestamp for this part (and a bunch of other places in this project)

}

export default ItemInfoDropdown