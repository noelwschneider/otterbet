// Logo images
import logoText from './OtterBet logo text.png'

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import { Grid } from '@mui/material';

export default function LogoText() {

  return (
    <Grid item xs={9} sx={styles.header.logo.text}>

      <img
        className="nav-logo"
        alt="logo-text"
        style={{
          height: "100%",
        }}
        src={logoText}
      />

    </Grid>
  )
}
