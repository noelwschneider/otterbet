// Components
import LogoPicture from './LogoPicture';
import LogoText from './LogoText';

// Style Components
import Grid from '@mui/material/Grid';
import { styles } from '../../../styling/styles'

function LogoContainer() {

  return (
    <Grid container item xs={7} sx={styles.header.logo.container}>
      <LogoText />
      <LogoPicture />
    </Grid>
  )

}

export default LogoContainer