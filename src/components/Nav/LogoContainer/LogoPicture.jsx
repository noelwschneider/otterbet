// Logo images
import logo from './otter-logo-1.png'

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import { Grid } from '@mui/material';

export default function LogoPicture() {
  return (
    <Grid
      className="nav-logo"
      item xs={3}
      sx={styles.header.logo.picture}>

      <img
        src={logo}
        alt="OtterBet logo"
        style={{
          height: "100%"
        }}
      />

    </Grid>)
}