// Routing hooks
import { useHistory } from 'react-router-dom';

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function UserMenu() {
  const history = useHistory();

  // Handler function for My Bets nav link
  const handleNavigation = (event) => {
    history.push(event.currentTarget.id);
  }

  return (
    <Grid
      component={Button}
      item xs={4}
      id='/my-bets'
      variant="text"
      className="navLink"
      sx={styles.header.menu.user}
      onClick={event => handleNavigation(event)}>
      My Bets
    </Grid>
  )
}

export default UserMenu;