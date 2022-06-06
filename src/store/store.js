import {
  createStore,
  applyMiddleware,
  // compose,
  combineReducers
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import thunk from 'redux-thunk';
import { uiReducer } from '../reducer/uiReducer';
import { calendarReducer } from '../reducer/calendarReducer';
import { authReducer } from '../reducer/authReducer';
//const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducers = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer,
})

export const store = createStore(
  reducers,
  composeWithDevTools( applyMiddleware(thunk) ),
);