import React from 'react';
import LoginForm from '../LoginForm/LoginForm';

// Style Tools
import { useTheme } from '@mui/material/styles';

function LoginPage() {
  const theme = useTheme()

  return (
    <div style={{backgroundColor: theme.palette.secondary.light, height: "100vh", display: "flex", alignItems: "center"}}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
