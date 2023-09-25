import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

// Style Tools
import { useTheme } from '@mui/material/styles';

function RegisterPage() {
  const history = useHistory();

  const theme = useTheme()

  return (
    <div style={{backgroundColor: theme.palette.secondary.light, height: "100vh", display: "flex", alignItems: "center"}}>
      <RegisterForm />

    </div>
  );
}

export default RegisterPage;
