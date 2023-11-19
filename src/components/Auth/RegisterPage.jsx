// Hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useStore from "../../hooks/useStore";

// Style Tools
import { styles } from '../../styling/styles';

// Style Components
import { 
  FormControl, 
  TextField, 
  Button } from '@mui/material';

  
function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useStore("errors");
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

  return (
    <FormControl
      sx={styles.classes.formPanel}
      onSubmit={registerUser} >

      <h2>Register</h2>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}


      <TextField
        label="Username"
        name="username"
        value={username}
        required
        onChange={(event) => setUsername(event.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={password}
        required
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button sx={styles.btn} onClick={registerUser}>Register</Button>

      <Button
        sx={styles.btn.asLink}
        onClick={() => {
          history.push('/login');
        }}
      >
        Login
      </Button>

    </FormControl>

  );
}

export default RegisterPage;