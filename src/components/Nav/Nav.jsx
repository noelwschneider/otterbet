import React from 'react';

// App Components
import MenuItems from './MenuContainer/MenuContainer';
import LogoContainer from '../Nav/LogoContainer/LogoContainer';

// Hooks
import { useSelector } from 'react-redux';

// Style Tools
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';


function Nav() {
  // Store variables
  const user = useSelector(store => store.user);

  // Custom theming
  const ComponentTheme = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "125px",
    position: "sticky",
    top: "0px",
    zIndex: "1",
    borderBottom: "2px solid black",
    boxShadow: "1px",
  }));

  return (<>

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