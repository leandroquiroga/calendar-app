import {
  AnyAction,
  Middleware,
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlainObject
} from '@reduxjs/toolkit'

import { uiReducer } from '../reducer/uiReducer';
import { calendarReducer } from '../reducer/calendarReducer';
import { authReducer } from '../reducer/authReducer';
// import types from '../types/types';
//const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Serializable Middleware 
const serializableMiddleware = createSerializableStateInvariantMiddleware({
  ignoredActions: ["../types/types"],
});

// const notSerializableMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: AnyAction) => {
//   if (!isPlainObject(action)) {
//     console.log(`La accion ${action.type} no es seriabilizable`)
//     return next()
//   }
// }

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
  },
  middleware: [serializableMiddleware],
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;