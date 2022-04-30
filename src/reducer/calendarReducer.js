import moment from 'moment';
import { types } from './../types/types';

const initialState = {
  events: [  {
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
    default:
      return state;
  }
}