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


function Nav() {
  // Store variables
  const user = useSelector(store => store.user);

  // Custom theming
  //? Why does this work even when I comment out the theme? How is the file getting access without the hook? I use the global theme in this file.
  const theme = useTheme()
  const ComponentTheme = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "125px",
    position: "sticky",
    top: "0px"
  }));

  return (<>

    {/* If no user is logged in, show these links */}


    {user.id
      ? (
        <ComponentTheme container>

          {/* Logo Section */}
          <LogoContainer className="navLogo" />

          {/* Menu Section */}
          <MenuItems />

        </ComponentTheme>
      )
      : (
        // Setting up this structure so I can tweak the Nav for when nobody is logged in
        <ComponentTheme container>

          {/* Logo Section */}
          <LogoContainer className="navLogo" />

          {/* Menu Section */}
          <MenuItems />

        </ComponentTheme>
      )

    }



  </>);
}

export default Nav;
