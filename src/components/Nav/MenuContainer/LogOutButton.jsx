//! This should probably be styled differently from MyBets and Markets tabs

import { useDispatch } from 'react-redux';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { styles } from '../../../styling/styles';

// Style Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function LogOutButton() {

  const theme = useTheme()
  const dispatch = useDispatch()

  return (
    <Grid
      className="navLink"
      item xs={4}
      component={Button} variant="text"
      sx={styles.header.menu.logout}
      onClick={() => dispatch({ type: 'LOGOUT' })}>

      Log Out

    </Grid>
  )
}

export default LogOutButton