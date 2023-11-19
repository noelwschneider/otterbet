import { useHistory } from 'react-router-dom';

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import {
  Button,
  Grid,
} from '@mui/material';


export default function LinesMenu() {

  const history = useHistory()

  const handleNavigation = (event) => {
    history.push(event.currentTarget.id)
  }

  return (
    <Grid
      className="navLink"
      item xs={4}
      component={Button}
      id='/markets'
      variant="text"
      sx={styles.header.menu.markets}
      onClick={event => handleNavigation(event)}>

      Lines

    </Grid>
  )
}