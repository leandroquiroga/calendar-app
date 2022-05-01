
import { types } from './../types/types';


export const eventAddNew = (event) => ({
  type: types.eventAddNew, 
  payload: event,
});


export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})


export const clearEventActive = () => ({ type: types.clearActiveEvent });

export const updatedEvent = (event) => ({
  type: types.eventUpdateNotes,
  payload: event
});

export const deleteEventNotes = () => ({ type: types.eventDeleteNotes });