import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import { authStartLogin, startCheking, startRegister, startUserLogut } from '../../actions/auth';
import * as fetchModule from '../../helpers/fetchAPI';

import '@testing-library/jest-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
Storage.prototype.setItem = jest.fn();
Storage.prototype.removeItem = jest.fn();

describe('Test on the action of auth.js', () => {

  let msgError = '';
  let email = '';
  let password = '';
  let name = '';
  let token = '';
  let uid = '';

  const setMsgError = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(() => [msgError, setMsgError]);

  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks();
  });


  test('this test should run the action authStartLogin correctly', async() => { 
    email = 'lea@correo.com';
    password = '123456';

    await store.dispatch(authStartLogin(email, password, setMsgError));

    const action = store.getActions();

    expect(action[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalled()
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    
    //Recupera el token del localstorage
    token = localStorage.setItem.mock.calls[0][1];
  
  });

  test('this test should run the action authStartLogin with a email incorrect', async() => {
    email = 'lea@test.com';
    password = '123456';

    await store.dispatch(authStartLogin(email, password, setMsgError));

    const action = store.getActions();

    msgError = "Lo sentimos, no encontramos su email en nuestra base de datos";

    expect(action).toEqual([]);
    expect(setMsgError).toHaveBeenCalledWith(msgError);
  });

  test('this test should run the action authStartLogin with a password incorrect', async () => {
    email = 'lea@correo.com';
    password = '1234536575';

    await store.dispatch(authStartLogin(email, password, setMsgError));

    const action = store.getActions();

    msgError = "La contraseña no es valida";
    
    expect(action).toEqual([]);
    expect(setMsgError).toHaveBeenCalledWith(msgError);
  });

  test('this test should run the action startRegister correctly', async () => {
    
    email = 'lea@test.com';
    password = 'test123';
    name = 'Testing';
    uid = '213qweawksne23ie'

    fetchModule.fetchNotToken = jest.fn(() => ({
      json() { return { ok: true, uid, name, token};},
    }));
    
    await store.dispatch(startRegister(email, password, name, setMsgError));

    const action = store.getActions();

    expect(action[0]).toEqual({
      type: types.authLogin,
      payload: { uid, name},
    });

    expect(action[0].payload.uid).toEqual(uid);
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

  });


  test('this test should return error in startRegister', async() => {
    email = 'lea@test.com';
    password = 'test123';
    name = 'Testing';
    msgError = 'Ya existe un usuario con ese correo';
  
    fetchModule.fetchNotToken = jest.fn(() => ({
      json() { return { ok: false, msg: msgError} },
    }));
    
    await store.dispatch(startRegister(email, password, name, setMsgError));

    const action = store.getActions();

    expect(action).toEqual([]);
    expect(setMsgError).toHaveBeenCalledWith(msgError);
  });


  test('this test should run startCheking correctly', async () => { 
    name = 'Leandro';
    uid = 'asdasd9a8231q8239u41893e4'
  
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true, uid, name, token
      }}
    }));
    await store.dispatch(startCheking());

    const action = store.getActions();

    expect(action[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid,
        name
      }
    });
    
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('this test should run failied startCheking', async() => {
    msgError = "No hay token en la peticion"; 

    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return { ok: false, msg: msgError }
      },
    }));

    await store.dispatch(startCheking()); 
    const action = store.getActions();
    expect(action[0]).toEqual({ type: types.authChekingFinish });
  });


  test('this test should run startUserLogout corretly', async() => {
    await store.dispatch(startUserLogut());

    const action = store.getActions();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token-init-date');
    expect(action[0]).toEqual({ type: types.eventLogout });
    expect(action[1]).toEqual({ type: types.authLogout });
  });

  test('this test should run checkingFinish correctly', async() => {
    const checkingFinish = jest.fn(() => ({ type: types.authChekingFinish }));
    await store.dispatch(checkingFinish());

    const action = store.getActions();
    expect(action[0]).toEqual({ type: types.authChekingFinish });
  });

  test('this test should run logout correctly', async() => {
    const logout = jest.fn(() => ({ type: types.authLogout }));
    await store.dispatch(logout());

    const action = store.getActions();
    expect(action[0]).toEqual({type: types.authLogout});
  });


  test('this test should run eventLogout correctly', async() => {
    const eventLogout = jest.fn(() => ({ type: types.eventLogout }));
    await store.dispatch(eventLogout());

    const action = store.getActions();

    expect(action[0]).toEqual({ type: types.eventLogout });
  });
});