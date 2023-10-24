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
import LoginPage from '../LoginRegister/LoginPage';
import RegisterPage from '../LoginRegister/RegisterPage';
import MyBets from '../MyBets/MyBets';
import MarketsPage from '../MarketsPage/MarketsPage';

// Style
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../../styling/theme';


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
    <CssBaseline>
      <Nav />
      <Switch>
        <Redirect exact from="/" to="/home" />

        {/* MY BETS */}
        <ProtectedRoute exact path="/my-bets">
          <MyBets />
        </ProtectedRoute>

        {/* MARKETS */}
        <ProtectedRoute exact path="/markets">
          <MarketsPage />
        </ProtectedRoute>

        {/* LOGIN */}
        <Route exact path="/login">
          {user.id ?
            // Redirect if user is already logged in
            <Redirect to="/my-bets" />
            :
            <LoginPage />
          }
        </Route>

        {/* REGISTRATION */}
        <Route exact path="/registration">
          {user.id ?
            // Redirect if user is already logged in
            <Redirect to="/my-bets" />
            :
            <RegisterPage />
          }
        </Route>

        {/* HOME */}
        <Route exact path="/home">
          {user.id ?
            // Redirect if user is already logged in
            <Redirect to="/my-bets" />
            :
            <LoginPage />
          }
        </Route>

        {/* 404 */}
        <Route>
          <h1>404</h1>
        </Route>

      </Switch>
    </CssBaseline>
  </ThemeProvider>
  );
}

export default App;