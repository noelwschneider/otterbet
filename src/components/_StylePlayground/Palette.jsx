import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';


function Palette() {

    const theme = useTheme()

    return(
    <Grid container columns={21} style={{ height: "30px" , border: "2px solid black"}}>
        {/* Primary */}
        <Grid item xs={1} style={{ backgroundColor: theme.palette.primary.main }}>Prim</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.primary.light }}>.lgt</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.primary.dark }}>.drk</Grid>

        {/* Secondary */}
        <Grid item xs={1} style={{ backgroundColor: theme.palette.secondary.main }}>Sec</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.secondary.light }}>.lgt</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.secondary.dark }}>.drk</Grid>

        {/* Tertiary */}
        <Grid item xs={1} style={{ backgroundColor: theme.palette.tertiary.main }}>BG</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.tertiary.light }}>.lgh</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.tertiary.dark, color: "#ffffff" }}>.drk</Grid>

        {/* Error */}
        <Grid item xs={1} style={{ backgroundColor: theme.palette.error.main }}>Err</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.error.light }}>lght</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.error.dark }}>.drk</Grid>

        {/* Warning */}
        <Grid item xs={1} style={{ backgroundColor: theme.palette.warning.main }}>Warn</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.warning.light }}>.lgt</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.warning.dark }}>.ddrk</Grid>

        {/* Info */}
        <Grid item xs={1} style={{ backgroundColor: theme.palette.info.main }}>Info</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.info.light }}>.lgt</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.info.dark }}>.drk</Grid>

        {/* Success */}
        <Grid item xs={1} style={{ backgroundColor: theme.palette.success.main }}>Suc</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.success.light }}>.lgt</Grid>
        <Grid item xs={1} style={{ backgroundColor: theme.palette.success.dark }}>.drk</Grid>

        </Grid>
)}

export default Palette