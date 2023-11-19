// State hooks (and React)
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../hooks/useStore';

// Routing hooks
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

// Style
import { styles } from '../../styling/styles';
import {
    Grid,
    FormControl,
    TextField,
    Button,
    Typography
} from '@mui/material';

// Utility
import { toTitleCase } from '../../utilities/_utilities';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errors = useStore("errors");
    const dispatch = useDispatch();
    const history = useHistory();

    const location = useLocation();
    
    const dispatchType = location.pathname === '/register' ? 'REGISTER' : 'LOGIN';
    const submitType = location.pathname === '/register' ? 'Register' : 'Log In';
    const redirectType = location.pathname === '/register' ? 'Log In' : 'Register';
    const redirectUrl = location.pathname === '/register' ? '/login' : '/register';

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (dispatchType === 'LOGIN' && (!username || !password)) {
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
            return;
        }
        dispatch({
            type: dispatchType,
            payload: {
                username: username,
                password: password,
            },
        });
        history.push('/my-bets');   
    };

    return (
        <Grid
        container
        alignItems="center"
        justify="center"
        component={FormControl}
        style={styles.auth.container}
        onSubmit={handleSubmit} >

            <Grid
            item xs={12}
            component={Typography}
            variant="h2"
            style={styles.auth.title}>
                {toTitleCase(dispatchType)}
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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
            style={styles.auth.input.container}/>

            <Grid
            item xs={12}
            component={Button}
            style={styles.auth.btn.primary} onClick={handleSubmit}>
                {submitType}
            </Grid>
            
            <Grid
            item xs={12}
            component={Button}
            style={styles.auth.btn.secondary}
            onClick={() => history.push(redirectUrl)}>
                {redirectType}
            </Grid>

        </Grid>
    );
}

export default LoginPage;