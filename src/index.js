import React from 'react';
import ReactDOM from 'react-dom';
import { AppRourter } from './router/AppRourter';

import './index.css'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <AppRourter />
  </React.StrictMode>,
  document.getElementById('root')
);

