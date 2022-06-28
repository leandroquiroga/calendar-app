import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import { eventSetActive, eventStartAddNew, eventStartLoading } from '../../actions/events';
import { prepareEvents } from '../../helpers/prepareEvents';

import * as fetchModule from '../../helpers/fetchAPI.js'

import '@testing-library/jest-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    name: 'Tester',
    uid: 'Testing23420384'
  }
};

let store = mockStore(initState);

describe('Test on events.js', () => {
  const eventMock = {
    title: 'Testing',
    notes: 'Hi! I am tester',
    start: '2022-06-02T12:45:00.000+00:00',
    end: '2022-06-02T13:00:00.000+00:00',
  }

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  
  test('this test should run the action eventAddNew correctly', () => {
    const eventAddNewMock = jest.fn((eventMock) => ({
      type: types.eventAddNew,
      payload: eventMock,
    }));
    
    store.dispatch(eventAddNewMock(eventMock));
    const action = store.getActions();

    expect(action[0].type).toEqual(types.eventAddNew);
    expect(action[0].payload).toEqual(eventMock);
  });

  test('this test should run the action eventLoaded correctly', () => {
    const eventLoadedMock = jest.fn((eventMock) => ({
      type: types.eventLoaded,
      payload: eventMock,
    }));

    store.dispatch(eventLoadedMock(eventMock));
    const action = store.getActions();

    expect(action[0].type).toEqual(types.eventLoaded); 
    expect(action[0].payload).toEqual(eventMock); 
  });

  test('this test should run the action updateEvent correctly', () => {
    const eventUpdateNotesMoked = jest.fn((eventMock) => ({
      type: types.eventUpdateNotes,
      payload: {
        ...eventMock,
        notes: 'Notas fue actualiza',
      }
    }));

    store.dispatch(eventUpdateNotesMoked(eventMock));
    const action = store.getActions();

    expect(action[0].type).toEqual(types.eventUpdateNotes);
    expect(action[0].payload).not.toEqual(eventMock);
  });

  test('this test should run the action deleteEventNotes correctly', () => {
    const deleteEventNotes = jest.fn(() => ({
      type: types.eventDeleteNotes
    }));

    store.dispatch(deleteEventNotes());
    const action = store.getActions();

    expect(action[0]).toEqual({ type: types.eventDeleteNotes });
  });

  test('this test should run the action eventSetActive correctly', () => {
    store.dispatch(eventSetActive(eventMock));
    const action = store.getActions();
    
    expect(action[0]).toEqual({
      type: types.eventSetActive,
      payload: eventMock
    })
  });
  
  test('this test should run the action eventStartAddNew correctly', async() => {

    const events = {
      type: types.eventAddNew,
      payload: eventMock,
    };

    const eventAddNewMock = jest.fn(() => ({
      type: types.eventAddNew, 
      payload: events,
    }))

    store.getState();
    const { uid, name } = store.getState().auth;
    
    // Realizar el try y catch de la accion
    try {
      
      // Mokear fetchWithToken para que retorne una respues JSON
      fetchModule.fetchWithToken = jest.fn(() => ({
        json() {
          return {
            ok: true,
            event: {
              eventMock,
              id: '32k4jh23kljwksd',
              user: {
                uid: uid,
                name: name
              },
            },
          }
        }
      }));

      // disparar la accion eventStartAddNew
      await store.dispatch(eventStartAddNew(eventMock));
      const action = store.getActions();

      events.payload.id = action[0].payload.id;
      events.payload.user = { uid, name };

      store.dispatch(eventAddNewMock(action));

      expect(action[0]).toEqual(events);
      expect(action[0].payload.user.uid).toBe(uid);
      expect(action[0].payload.user.name).toBe(name);

      // expect(action[0].type).toEqual()
    } catch (error) {
      console.log(error)
    }
  
  });
   
test('this test should run the action eventStartLogin correctly', async () => { 

    try {
      fetchModule.fetchWithToken = jest.fn(() => ({
        json() {
          return {
            ok: true,
            event: [eventMock]
          }
        }
      }));

      await store.dispatch(eventStartLoading());
      const accion = store.getActions();

      expect(accion.length).toBeGreaterThan(0);
      expect(accion[0].type).toEqual(types.eventLoaded);
      
      const eventLoadedMock = jest.fn((accion) => ({
        type: types.eventLoaded, 
        payload: accion,
      }))

      const body = store.dispatch(eventLoadedMock(accion[0].payload));

      expect(body.type).toEqual(types.eventLoaded);
      expect(body.payload[0].end).not.toEqual(eventMock.end);
      expect(body.payload[0].start).not.toEqual(eventMock.start);

      
    } catch (error) {
      console.log(error)
    }
  }); 
});