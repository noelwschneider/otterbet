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
    <div style={{backgroundColor: theme.palette.secondary.light, height: "100vh", display: "flex", alignItems: "center"}}>
      <LoginForm />


    </div>
  );
}

export default LoginPage;
