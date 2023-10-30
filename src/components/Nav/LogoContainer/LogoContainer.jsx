// Components
import LogoPicture from './LogoPicture';
import LogoText from './LogoText';

// Style Components
import Grid from '@mui/material/Grid';

function LogoContainer() {

  return (
    <Grid container item xs={7} height={"100%"}>
      <LogoText />
      <LogoPicture />
    </Grid>
  )

}

export default LogoContainer