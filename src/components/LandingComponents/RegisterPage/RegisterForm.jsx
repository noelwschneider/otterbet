// State hooks (and React)
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Routing hook
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Style Tools
import { useTheme } from '@mui/material/styles';

function RegisterForm() {
  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);

  const history = useHistory();
  
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; 

  const theme = useTheme();

  return (
    <form className="formPanel" onSubmit={registerUser} style={{
      backgroundColor: "#ede8e8", 
      }}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" style={{backgroundColor: theme.palette.primary.main, fontWeight: "bold"}} />
      </div>

      <center >
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>

    </form>
  );
}

export default RegisterForm;
