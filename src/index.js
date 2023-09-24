import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import store from './redux/store';

import App from './components/App/App';
import { HashRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

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

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <ThemeProvider theme={theme} >
        <App style={{backgroundColor: theme.palette.secondary.light}}/>
        </ThemeProvider >
      </Router>
      
    </Provider>
  </React.StrictMode>
);
