// Components
import UserMenu from './UserMenu';
import LinesMenu from './LinesMenu';
import LogOutButton from './LogOutButton';

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import { Grid } from '@mui/material';


export default function MenuItems() {
  return (
    <Grid
      container
      item xs={5}
      sx={styles.header.menu.container}>

      <UserMenu />
      <LinesMenu />
      <LogOutButton />

    </Grid>
  )
}