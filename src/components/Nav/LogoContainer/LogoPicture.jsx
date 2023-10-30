import React, { useState } from 'react';

// Logo images
import logo from './otter-logo-1.png'

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { styles } from '../../../styling/styles'

// Style Components
import Grid from '@mui/material/Grid';

function LogoPicture() {

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

export default LogoPicture