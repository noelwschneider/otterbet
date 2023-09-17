import React from 'react';

// Router
import { Link } from 'react-router-dom';

// App Components
import LogOutButton from '../LogOutButton/LogOutButton';
import MenuItems from './MenuItems/MenuItems';
import LogoContainer from '../Nav/LogoContainer/LogoContainer';

// Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

// Styling
import { Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import './Nav.css';


function Nav() {
  // Store variables
  const user = useSelector(store => store.user);
  const entry = useSelector(store => store.entry)

  // Custom theming
  const theme = useTheme()
  const ComponentTheme = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "115px",
    margin: "0px 0px 0px 0px"
  }));

  //! I don't think I use this here anymore
  const [anchorEl, setAnchorEl] = useState(null)

  //! Will almost certainly be moving down to its local component
  const [otter, setOtter] = useState(true)

  return (<>

    {/* If no user is logged in, show these links */}
    {user.id && (

      <ComponentTheme container>

        {/* Logo Section */}
        <LogoContainer className="navLogo" />

        {/* Menu Section */}
        <MenuItems />

      </ComponentTheme>
      
    )}

  </>);
}

export default Nav;
