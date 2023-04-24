import { types } from '../types/types';
import { fetchWithToken } from '../helpers/fetchAPI';
import { AppDispatch, RootState } from '../store/store';
import { convertToEvent } from '../helpers/convertToEvents';
import { prepareEvents } from '../helpers/prepareEvents';

export interface Event {
  title: string;
  notes: string;
  end: Date;
  start: Date;
  id?: string
  user?: User;
}

export interface PreparedEvent {
  end: Date;
  start: Date;
  title: string;
  notes: string;
  id?: string;
  user?: User;
};

type User = {
  uid: string;
  name: string;
}
const eventAddNew = (event: Event) => ({
  type: types.eventAddNew, 
  payload: event,
});

const eventLoaded = (event: Event[]) => ({
  type: types.eventLoaded,
  payload: event
});

const updatedEvent = (event: Event) => ({
  type: types.eventUpdateNotes,
  payload: event
});

const deleteEventNotes = () => ({ type: types.eventDeleteNotes });

export const eventStartAddNew = (event: Event) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid, name } = getState().auth;

    try {
      const response = await fetchWithToken("events", "POST", event);
      const body = await response.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          uid,
          name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventSetActive = (event: Event) => ({
  type: types.eventSetActive,
  payload: event
})

export const clearEventActive = () => ({ type: types.clearActiveEvent });

export const eventStartLoading = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchWithToken("events");
      const body = await response.json();
      const preparedEvents = prepareEvents(body.event);
      const events = convertToEvent(preparedEvents);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartUpdate = (event: Event) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchWithToken(`events/${event.id}`, "PUT", event);
      const body = await response.json();

      if (body.ok) return dispatch(updatedEvent(event));

      console.log(body.msg);
    } catch (error) {
      console.log(error);
    }
  };
};

// Buscar una mejor definicion para el tipo de retorno de la funcion
export const eventStartDelete = (): any => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { id } = getState().calendar.activeEvent;

    try {
      const response = await fetchWithToken(`events/${id}`, "DELETE");
      const body = await response.json();

      if (body.ok) return dispatch(deleteEventNotes());

      console.log(body.msg);
    } catch (error) {
      console.log(error);
    }
  };
};