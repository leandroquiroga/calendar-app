import {
  Middleware,
  configureStore,
  createSerializableStateInvariantMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { uiReducer } from "../reducer/uiReducer";
import { calendarReducer } from "../reducer/calendarReducer";
import { authReducer } from "../reducer/authReducer";

const serializabledMiddleware: Middleware = (store: any) => (next: any) => (action: any) => {
  const ignoredPaths: string[] = [];
  const ignorePathCalendar: string[] = [];
  
  // const ignoredActionsPaths: any =
  // Verificamos si la accion es un arreglo de eventos
  if (Array.isArray(action.payload?.events)) {
    // En caso de que sea un arreglo cargamos todos los eventos de manera dinamica
    // para las propiedades start y end.
    action.payload.events.forEach((e: any, index: number) => {
      ignoredPaths.push(`payload.events.${index}.start`);
      ignoredPaths.push(`payload.events.${index}.end`);
    });
  }

  if (Array.isArray(action.calendar?.events)) {
    // En caso de que sea un arreglo cargamos todos los eventos de manera dinamica
    // para las propiedades start y end.
    action.calendar.events.forEach((e: any, index: number) => {
      ignorePathCalendar.push(`calendar.events.0.start`);
      ignorePathCalendar.push(`calendar.events.${index}.end`);
    });
  };

    const ignoreActions: string[] = [
      "payload.DO_NOT_SERIALIZE",
      "payload.start",
      "payload.end",
    ];

  const combinedIgnoredPath: any[] = [
    ...ignoredPaths,
    ...ignorePathCalendar,
    ...ignoreActions
  ];

  const serializabledCheckingConfig: any = {
    ignoredActionsPaths: combinedIgnoredPath,
  };

  // Creamos el middleware de serializabledCheck
  const serializableCheckMiddleware =
    createSerializableStateInvariantMiddleware(serializabledCheckingConfig);

  // Ejecutamos el middleware
  const middleware = serializableCheckMiddleware(store)(next)(action);

  return middleware;
};

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serializabledMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;