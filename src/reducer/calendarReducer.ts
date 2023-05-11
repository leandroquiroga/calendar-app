import moment from 'moment';
import { types } from '../types/types';

interface EventData {
  id: number;
  title: string;
  start: Date;
  end: Date;
  notes: string;
}

interface CalendarState {
  events: EventData[],
  activeEvent: EventData | null;
}

const initialState: CalendarState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action: any) => {
  let data: any | any[];

  switch (action.type) {
    case types.eventSetActive:
      data = {
        ...action.payload,
        start: moment(action.payload.start).toDate(),
        end: moment(action.payload.end).toDate(),
      };
      return {
        ...state,
        activeEvent: data
      }
    case types.eventAddNew:
      data = {
        ...action.payload,
        start: moment(action.payload.start).toDate(),
        end: moment(action.payload.end).toDate(),
      };
      return {
        ...state,
        events: [
          ...state.events,
          data
        ]
      }
    
    case types.clearActiveEvent:
      return {
        ...state,
        activeEvent: null
      }
    case types.eventUpdateNotes:
      data = {
        ...action.payload,
        start: moment(action.payload.start).toDate(),
        end: moment(action.payload.end).toDate(),
      };
      return {
        ...state,
        events: state.events.map(
          e => (e.id === action.payload.id) ? data : e
        )
      };
    
    case types.eventDeleteNotes:
      return {
        ...state,
        events: state.events.filter(
          e => e.id !== state.activeEvent?.id
        ),
        activeEvent: null
      };
    
    case types.eventLoaded:
      console.log(action.payload);
      data = action.payload.map((e: EventData) => {
        return {
          ...e,
          start: moment(e.start).toDate(),
          end: moment(e.end).toDate(),
        }
      });
      console.log(data);

      return {
        ...state,
        events: [...data],
      };
      
    case types.eventLogout:
      return {
        ...state,
      };
    
    default:
      return state;
  }
}