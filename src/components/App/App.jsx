// React
import React, { useEffect } from 'react';

// React Router
import {
  HashRouter as Router,
  Redirect, 
  Route,
  Switch,
  useLocation
} from 'react-router-dom';

// Hooks
import { useDispatch, useSelector } from 'react-redux';

// Universal Components
import Nav from '../Nav/Nav';

// Review this component
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Route Components

import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MyBets from '../MyBets/MyBets';
import MarketsPage from '../MarketsPage/MarketsPage';

// Style
import './App.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b16300',
    },
    secondary: {
      main: '#ecc8a1',
    },
    tertiary: {
      main: "#6b6b6b",
      light: '#bbbbbb',
      dark: "#000000",
    },
  },
  typography: {
    fontFamily: 'Josefin Sans',
    body2: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
    },
    caption: {
      fontFamily: 'Montserrat',
    },
    body1: {
      fontWeight: 500,
      fontFamily: 'Montserrat',
    },
    h5: {
      fontFamily: 'Josefin Slab',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Josefin Slab',
      fontWeight: 600,
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
})

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const location = useLocation();

  useEffect(() => {
    // dispatch({ type: 'FETCH_USER' });
    window.scrollTo(0, 0);
  }, [location]);

  const ComponentTheme = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light
}));

  return (<ThemeProvider theme={theme} >
    {/* <Router> */}
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          
          <ProtectedRoute
            exact
            path ="/my-bets"
          >
            <MyBets />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path ="/markets"
          >
            <MarketsPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/my-bets" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/my-bets" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/my-bets" />
              :
              // Otherwise, show the Landing page
              // <LandingPage />
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    {/* </Router> */}
    </ThemeProvider>
  );
}

export default App;
