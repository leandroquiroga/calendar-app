import { types } from './../types/types';
import { fetchWithToken } from '../helpers/fetchAPI';
import { prepareEvents } from '../helpers/prepareEvents';

const eventAddNew = (event) => ({
  type: types.eventAddNew, 
  payload: event,
});

const eventLoaded = (event) => ({
  type: types.eventLoaded,
  payload: event
});

const updatedEvent = (event) => ({
  type: types.eventUpdateNotes,
  payload: event
});

const deleteEventNotes = () => ({ type: types.eventDeleteNotes });

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {

    const { uid, name } = getState().auth;
    
    try {
      const response = await fetchWithToken('events', event, 'POST');
      const body = await response.json();

      if (body.ok) {
        event.id = body.event.id
        event.user = {
          uid,
          name,
        };
        dispatch(eventAddNew(event));
      }
      
    } catch (error) {
      console.log(error)
    }
  };
};

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const clearEventActive = () => ({ type: types.clearActiveEvent });

export const eventStartLoading = () => {
  return async(dispatch) => {
    try {
      const response = await fetchWithToken('events');
      const body = await response.json(); 
      const events = prepareEvents(body.event);
      
      dispatch(eventLoaded(events))
    } catch (error) {
      console.log(error)
    }
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await response.json();

      if (body.ok)
        return dispatch(updatedEvent(event));

      console.log(body.msg);
    } catch (error) {
      console.log(error)
    }
  }
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {

    const { id } = getState().calendar.activeEvent;
    
    try {
      const response = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await response.json();
      
      if (body.ok)
        return dispatch(deleteEventNotes());
      
      console.log(body.msg)
      
    } catch (error) {
      console.log(error)
    }
  }
};