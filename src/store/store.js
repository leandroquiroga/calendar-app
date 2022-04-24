import {
  createStore,
  applyMiddleware,
  // compose,
  combineReducers
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import thunk from 'redux-thunk';
import { uiReducer } from '../reducer/uiReducer';


//const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  ui: uiReducer
})

export const store = createStore(
  reducers,
  composeWithDevTools( applyMiddleware(thunk) ),
);


