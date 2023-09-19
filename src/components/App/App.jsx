// React
import React, { useEffect } from 'react';

// React Router
import {
  HashRouter as Router,
  Redirect, //? This seems fairly intuitive, but I should review it
  Route,
  Switch, //? I am a little unclear on what this is doing (or at least, why it needs to do it. Why use this over an exact path? More info: https://v5.reactrouter.com/web/api/Switch )
} from 'react-router-dom';

// Hooks
import { useDispatch, useSelector } from 'react-redux';

// Universal Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

//^ Review this component
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Route Components

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MyBets from '../MyBets/MyBets';
import CreateEntry from '../CreateEntry/CreateEntry';
import CreateContest from '../CreateContest/CreateContest';
import MarketsPage from '../MarketsPage/MarketsPage';



// Style
import './App.css';
import { createTheme, useTheme, ThemeProvider, styled } from '@mui/material/styles';


//! DEVELOPER TOOLS
import TestButtons from '../TestButtons/TestButtons';
import StylePlayground from '../_StylePlayground/_StylePlayground';

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


  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const ComponentTheme = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light
}));

  return (<ThemeProvider theme={theme} >
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/test-buttons"
          >
            <TestButtons />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/style"
          >
            <StylePlayground />
          </ProtectedRoute>
          
          <ProtectedRoute
            exact
            path ="/my-bets"
          >
            <MyBets />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path ="/create-entry">
            <CreateEntry />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path ="/create-contest">
            <CreateContest />
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
              <Redirect to="/user" />
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
              <Redirect to="/user" />
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
    </Router>
    </ThemeProvider>
  );
}

export default App;
