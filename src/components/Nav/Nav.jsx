import React from 'react';

// Router
import { Link } from 'react-router-dom';

// Logout button component
import LogOutButton from '../LogOutButton/LogOutButton';

// Hooks
import { useSelector, useDispatch } from 'react-redux';

// Styling
import './Nav.css';
import logo from './otter-logo-1.png'
import { Typography } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);
  const entry = useSelector(store => store.entry)

  const fundsDisplay = entry ? entry.funds.toFixed(2) : null
  const entryDisplay = entry ? entry.name : null
  console.log(entryDisplay)
  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">OtterBet</h2>
        <img className="nav-logo" src={logo} alt="OtterBet logo" width="128" height="128"/>
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
        {/* ^ On first read, I'm not sure how the following line of code works */}
        {/* ^ On second read, we definitely went over this briefly in class -- it is a weird conditional syntax */}
        {user.id && (
          <>
          <Typography variant="h5">
            Entry: {entryDisplay}<br/>
            Funds: ${fundsDisplay}
          </Typography>
            <Link className="navLink" to="/my-bets">
              My Bets 
            </Link>

            <Link className="navLink" to="/markets">
              Markets 
            </Link>

            <Link className="navLink" to="/user">
              User 
            </Link>
            

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
