// State hooks (and React)
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Routing hooks
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { useTheme } from '@mui/material/styles';

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

export default LoginPage;