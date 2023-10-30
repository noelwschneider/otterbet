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
    <Grid item xs={4} sx={styles.header.menu.logout}>

      <Button
        variant="text"
        className="navLink"
        style={{ width: "100%", color: theme.palette.primary.contrastText }}
        onClick={() => dispatch({ type: 'LOGOUT' })}
      >
        Log Out
      </Button>

    </Grid>
  )
}

export default LogOutButton