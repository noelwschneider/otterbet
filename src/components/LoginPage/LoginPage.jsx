import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

function LoginPage() {
  const history = useHistory();

  const theme = useTheme()

  return (
    <div style={{backgroundColor: theme.palette.secondary.light, height: "100vh"}}>
      <LoginForm />

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
    </div>
  );
}

export default LoginPage;
