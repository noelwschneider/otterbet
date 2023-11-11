import { useDispatch } from 'react-redux';

// Style Tools
import { styles } from '../../../styling/styles';

// Style Components
import { 
  Button,
  Grid,
 } from '@mui/material';


export default function LogOutButton() {
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