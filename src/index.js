import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './components/App/App';
import { HashRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>      
    </Provider>
  </React.StrictMode>
);
