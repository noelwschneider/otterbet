import { useHistory } from 'react-router-dom';

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function MarketsMenu() {

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

      Markets

    </Grid>
  )
}

export default MarketsMenu