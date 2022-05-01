import moment from 'moment';
import { types } from './../types/types';

const initialState = {
  events: [{
    id: new Date().getTime(),
    title: 'Cita',
    notes: 'Llevar el mate',
    start: moment().toDate(),
    end: moment().add(4, 'hours').toDate(),
    user: {
      id: '245634',
      name: 'Leandro',
      email: 'leandro@correo.com'
    }
  }],
  activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case types.eventSetActive: 
      return {
        ...state,
        activeEvent: action.payload
      }
    case types.eventAddNew: 
      return {
        ...state,
        events: [
          ...state.events,
          action.payload
        ]
      }
    
    case types.clearActiveEvent: 
      return {
        ...state,
        activeEvent: null
      }
    case types.eventUpdateNotes:
      return {
        ...state,
        events: state.events.map(
          e => (e.id === action.payload.id) ? action.payload : e
        )
      };
    
    case types.eventDeleteNotes: 
      return {
        ...state, 
        events: state.events.filter(
          e => e.id !== state.activeEvent.id
        ),
        activeEvent: null
      }
    default:
      return state;
  }
}