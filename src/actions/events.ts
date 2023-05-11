import Swal from 'sweetalert2';
import { types } from '../types/types';
import { fetchWithToken } from '../helpers/fetchAPI';
import { AppDispatch, RootState } from '../store/store';

export interface Event {
  title: string;
  notes: string;
  end: string;
  start: string;
  id?: string
  user?: User;
}

export interface PreparedEvent {
  end: string;
  start: string;
  title: string;
  notes: string;
  id?: string;
  user?: User;
};

type User = {
  uid: string;
  name: string;
}
const eventAddNew = (event: any) => ({
  type: types.eventAddNew, 
  payload: event,
});

const eventLoaded = (event: any[]) => ({
  type: types.eventLoaded,
  payload: event,
});

const updatedEvent = (event: any) => ({
  type: types.eventUpdateNotes,
  payload: event
});

const deleteEventNotes = () => ({ type: types.eventDeleteNotes });

export const eventStartAddNew = (event: Event): any => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid, name } = getState().auth;
    try {
      const response = await fetchWithToken("events", "POST", event);
      const body = await response.data;
      
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

export const eventStartLoading = (): any => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchWithToken("events", "GET");
      const body = await response.data;
      dispatch(eventLoaded(body.event)); 
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartUpdate = (event: Event): any => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchWithToken(`events/${event.id}`, "PUT", event);
      const body = await response.data;

      if (body.ok) {
        dispatch(updatedEvent(event));
        Swal.fire({
          title: 'Excelente!',
          text: `${body.msg}`,
          icon: 'success'
        });
        return
      };

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
      const body = await response.data;

      if (body.ok) return dispatch(deleteEventNotes());

    } catch (error) {
      console.log(error);
    }
  };
};