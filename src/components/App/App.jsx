// React Router
import {
  HashRouter as Redirect, 
  Route,
  Switch,
  useLocation
} from 'react-router-dom';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// Custom route component
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Custom components
import Nav from '../Nav/Nav';
import LoginPage from '../LandingComponents/LoginPage/LoginPage';
import RegisterPage from '../LandingComponents/RegisterPage/RegisterPage';
import MyBets from '../MyBets/MyBets';
import MarketsPage from '../MarketsPage/MarketsPage';

// Style
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Global theme
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
  const user = useSelector(store => store.user);
  const location = useLocation();
  const dispatch = useDispatch();

  // Fetch user on initial page load
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [])

  // Render page at top of window when new page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (<ThemeProvider theme={theme} >
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          
          {/* MY BETS */}
          <ProtectedRoute
            exact
            path = "/my-bets"
          >
            <MyBets />
          </ProtectedRoute>

          {/* MARKETS */}
          <ProtectedRoute
            exact
            path = "/markets"
          >
            <MarketsPage />
          </ProtectedRoute>

          {/* LOGIN */}
          <Route
            exact
            path = "/login"
          >
            {user.id ?
              // Redirect if user is already logged in
              <Redirect to = "/my-bets" />
              :
              <LoginPage />
            }
          </Route>

          {/* REGISTRATION */}
          <Route
            exact
            path = "/registration"
          >
            {user.id ?
              // Redirect if user is already logged in
              <Redirect to="/my-bets" />
              :
              <RegisterPage />
            }
          </Route>

          {/* HOME */}
          <Route
            exact
            path = "/home"
          >
            {user.id ?
              // Redirect if user is already logged in
              <Redirect to="/my-bets" />
              :
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
    </ThemeProvider>
  );
}

export default App;