// State hooks (and React)
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Routing hooks
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
// import * as styles from '../../styling/styles';
import { styles } from '../../styling/styles';

// Style Components
import { Box, FormControl, TextField, Button } from '@mui/material';


function LoginPage() {
  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);

  const dispatch = useDispatch();
  const history = useHistory()

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
    <FormControl
      component={Box}
      sx={styles.classes.formPanel}
      onSubmit={login} >

      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      <TextField
        label="Username"
        type="text"
        name="username"
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button sx={styles.btn} onClick={login}>Log In</Button>

      <Button
        sx={styles.btn.asLink}
        onClick={() => {
          history.push('/registration');
        }}
      >
        Register
      </Button>

    </FormControl>

  );
}

export default LoginPage;