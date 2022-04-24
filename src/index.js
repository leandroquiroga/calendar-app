import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { AppRourter } from './router/AppRourter';

import './index.css'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <AppRourter />
  </Provider>,
  document.getElementById('root')
);