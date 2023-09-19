import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import Palette from '../_StylePlayground/Palette';

function LoginForm() {
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
  }; // end login

  const theme = useTheme()
    


  return (
    
    <form 
      className="formPanel" 
      onSubmit={login} 
      style={{
        backgroundColor: "#ede8e8", 
        }}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onClick={(event) => setUsername('gambles_the_otter')}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onClick={(event) => setPassword('gambles_the_otter')}
          />
        </label>
      </div>
      <div >
        <input className="btn" type="submit" name="submit" value="Log In" style={{backgroundColor: theme.palette.primary.main, fontWeight: "bold"}}/>
      </div>

      <center >
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    
    </form>
    
  );
}

export default LoginForm;
