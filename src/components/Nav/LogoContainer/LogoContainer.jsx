// Components
import LogoPicture from './LogoPicture';
import LogoText from './LogoText';

// Styling
import { Grid } from '@mui/material';
import { styles } from '../../../styling/styles'


export default function LogoContainer() {
  return (
    <Grid container item xs={7} sx={styles.header.logo.container}>
      <LogoText />
      <LogoPicture />
    </Grid>
  )
}