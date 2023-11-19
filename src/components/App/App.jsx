// React Router
import {
    Redirect,
    Route,
    Switch,
    useLocation
} from 'react-router-dom';

// Hooks
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useStore from '../../hooks/useStore';

// Custom route component
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Custom components
import Nav from '../Nav/Nav';
import LoginPage from '../Auth/LoginPage';
import RegisterPage from '../Auth/RegisterPage';
import MyBetsContainer from '../MyBets/MyBetsContainer';
import Lines from '../Lines/Lines';

// Style
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../../styling/theme';
import { styles } from '../../styling/styles';

function App() {
    const user = useStore("user");
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

    return (
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <Nav />
            <Switch>
                <Redirect exact from="/" to="/my-bets" />

                {/* MY BETS */}
                <ProtectedRoute exact path="/my-bets">
                    <MyBetsContainer />
                </ProtectedRoute>

                {/* MARKETS */}
                <ProtectedRoute exact path="/markets">
                    <Lines />
                </ProtectedRoute>

                {/* LOGIN */}
                <Route exact path="/login">
                    {user.id ?
                        <Redirect to="/my-bets" />
                        :
                        <LoginPage />
                    }
                </Route>

                {/* REGISTRATION */}
                <Route exact path="/registration">
                    {user.id ?
                        <Redirect to="/my-bets" />
                        :
                        <RegisterPage />
                    }
                </Route>

                {/* 404 */}
                <Route>
                    <h1>404</h1>
                </Route>

            </Switch>
        </ThemeProvider>
    );
}

export default App;