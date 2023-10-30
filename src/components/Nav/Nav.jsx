// App Components
import MenuContainer from './MenuContainer/MenuContainer';
import LogoContainer from '../Nav/LogoContainer/LogoContainer';

// Hooks
import { useSelector } from 'react-redux';

// Style Tools
import { styles } from '../../styling/styles'

// Style Components
import Grid from '@mui/material/Grid';


function Nav() {
  const user = useSelector(store => store.user);

  return (
  <>
    { user.id
      ? (
        <Grid container sx={styles.header.container}>

          {/* Logo Section */}
          <LogoContainer className="navLogo" />

          {/* Menu Section */}
          <MenuContainer />

        </Grid>
      )
      : (
        <Grid container sx={styles.header.container}>

          {/* Logo Section */}
          <LogoContainer className="navLogo" />

          {/* Menu Section */}
          <MenuContainer />

        </Grid>
      )
    }
  </>);
}

export default Nav;