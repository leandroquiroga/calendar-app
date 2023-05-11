import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { AppRourter } from './router/AppRourter';

import './index.css'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { store } from './store/store';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <AppRourter />
  </Provider>
);