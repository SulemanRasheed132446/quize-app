import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { serviceWorker } from './swDEv';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker();

