// State hooks (and React)
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../hooks/useStore';

// Routing hooks
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { styles } from '../../styling/styles';

// Style Components
import {
    Grid,
    Box,
    FormControl,
    TextField,
    Button,
    Typography
} from '@mui/material';


function LoginPage() {
    // State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errors = useStore("errors");

    const dispatch = useDispatch();
    const history = useHistory();

    const login = (event) => {
        event.preventDefault();

        if (username && password) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    username: username,
                    password: password,
                },
            });
            history.push('/my-bets')
        } else {
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    };

    return (
        <Grid
        container
        alignItems="center"
        justify="center"
        component={FormControl}
        style={styles.auth.container}
        onSubmit={login} >

            <Grid
            item xs={12}
            component={Typography}
            variant="h2"
            style={styles.auth.title}>
                Login
            </Grid>

            <Grid item xs={12}>
                {errors.loginMessage && (
                    <h3 className="alert" role="alert">
                        {errors.loginMessage}
                    </h3>
                )}
            </Grid>

            <Grid
            item xs={12}
            component={TextField}
            InputLabelProps={{ 
                style: styles.auth.input.label
            }}
            InputProps={{
                style: styles.auth.input
            }}
            label="Username"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={styles.auth.input.container}/>

            <Grid
            item xs={12}
            component={TextField}
            InputLabelProps={{ 
                style: styles.auth.input.label
            }}
            InputProps={{
                style: styles.auth.input
            }}
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={styles.auth.input.container}/>

            <Grid
            item xs={12}
            component={Button}
            style={styles.auth.btn.primary} onClick={login}>
                Log In
            </Grid>
            
            <Grid
            item xs={12}
            component={Button}
            style={styles.auth.btn.secondary}
            onClick={() => history.push('/registration')}>
                Register
            </Grid>

        </Grid>
    );
}

export default LoginPage;