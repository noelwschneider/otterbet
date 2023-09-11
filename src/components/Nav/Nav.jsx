import React from 'react';

// Router
import { Link } from 'react-router-dom';

// Logout button component
import LogOutButton from '../LogOutButton/LogOutButton';

// Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

// Styling
import logo from './otter-logo-1.png'
import { Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './Nav.css';


function Nav() {
  const user = useSelector((store) => store.user);
  const entry = useSelector(store => store.entry)

  const fundsDisplay = entry ? entry.funds.toFixed(2) : null
  const entryDisplay = entry ? entry.name : null

  const [anchorEl, setAnchorEl] = useState(false);


  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">OtterBet</h2>
        <img className="nav-logo" src={logo} alt="OtterBet logo" width="128" height="128" />
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (<>
          <Typography variant="h5">
            Entry: {entryDisplay}<br />
            Funds: ${fundsDisplay}
          </Typography>

          <Button 
            className="navLink"
            component={Link}
            to="/test-buttons">
              Test Buttons
          </Button>
          

          <Button
            className="navLink"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            variant="contained"
          >
            My Bets
          </Button>

          <Menu
            className="navMenu"
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(false)}
          >
            <MenuItem 
            onClick={() => setAnchorEl(null)}
            className="navMenuItem"
            disableGutters={true}>
              My Bets
            </MenuItem>
            
            <MenuItem 
            className="navMenuItem"
            disableGutters={true}
            onClick={() => setAnchorEl(null)}>
              Create Entry
            </MenuItem>
            
            <MenuItem 
            className="navMenuItem"
            disableGutters={true}
            onClick={() => setAnchorEl(null)}>
              Create Contest
            </MenuItem>
            
          </Menu>



          <Button 
            className="navLink"
            component={Link}
            to="/markets">
              Markets
          </Button>

          <Button 
            className="navLink"
            component={Link}
            to="/user">
              User
          </Button>

          <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
