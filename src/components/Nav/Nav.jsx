// App Components
import MenuContainer from './MenuContainer/MenuContainer';
import LogoContainer from '../Nav/LogoContainer/LogoContainer';

// Hooks
import useStore from '../../hooks/useStore';

// Style Tools
import { styles } from '../../styling/styles';

// Style Components
import { Grid } from '@mui/material';


export default function Nav() {
  const user = useStore("user");

  return (<>
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