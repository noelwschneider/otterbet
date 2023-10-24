import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#b16300',
        },
        secondary: {
            main: '#ecc8a1',
        },
        tertiary: {
            main: "#6b6b6b",
            light: '#bbbbbb',
            dark: "#000000",
        },
        text: {
            main: "#efefef",
        }
    },
    typography: {
        fontFamily: 'Josefin Sans',
        body2: {
            fontFamily: 'Montserrat',
            fontWeight: 500,
        },
        caption: {
            fontFamily: 'Montserrat',
        },
        body1: {
            fontWeight: 500,
            fontFamily: 'Montserrat',
        },
        h5: {
            fontFamily: 'Josefin Slab',
            fontWeight: 600,
        },
        h6: {
            fontFamily: 'Josefin Slab',
            fontWeight: 600,
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
})

export default theme;