import React from 'react';
import { mount} from "enzyme";
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { storeAppRouter } from "../../utilities/utilities";
import { AppRourter } from "../../router/AppRourter";
import { PublicRoute } from '../../router/PublicRoute';
import { Register } from '../../components/auth/Register';
import { Login } from '../../components/auth/Login';
import { PageNotFound } from '../../components/pageNotFound/PageNotFound';
import { PrivateRoute } from '../../router/PrivateRoute';
import { CalendarApp } from '../../CalendarApp';

import '@testing-library/jest-dom';
import '../../setupTest';

jest.mock('../../actions/auth', () => ({
  startCheking: jest.fn()
}));


storeAppRouter.dispatch = jest.fn();


describe('Test on <AppRouter />', () => {

  test('this test should make a snapshot with component <Loading /> corretly', () => {

    const wapper = mount(
      <Provider store={storeAppRouter}>
        <AppRourter />
      </Provider>
    );

    expect(wapper).toMatchSnapshot();
  });

  test('this test should make a snapshot with component <Login /> corretly', () => {

    const stateChecking = storeAppRouter.getState();

    stateChecking.auth.checking = false

    const wapper = mount(
      <Provider store={storeAppRouter}>
        <MemoryRouter initialEntries={['/login']}>
           <Routes>
            <Route path='login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>
              }/>
           </Routes>
         </MemoryRouter>
      </Provider>
    );

    expect(wapper).toMatchSnapshot();
    expect(wapper.find('.btn-primary').text().trim()).toBe('Iniciar sesión');

  });

   test('this test should make a snapshot with comoponent <Register /> correctle', () => {

     const wapper = mount(
       <Provider store={storeAppRouter}>
         <MemoryRouter initialEntries={['/register']}>
           <Routes>
            <Route path='register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
              }/>
           </Routes>
         </MemoryRouter>
      </Provider>
    );
    expect(wapper).toMatchSnapshot()
    expect(wapper.find('.btn-primary').text().trim()).toBe('Registrarme');

   });

  test('this test should make a snapshot with component <PageNotFound /> correctly', () => {

    const wapper = mount(
      <Provider store={storeAppRouter}>
        <MemoryRouter initialEntries={['/*']}>
          <Routes>
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(wapper).toMatchSnapshot();
    expect(wapper.find('.btn-dark').text().trim()).toBe('Regresar');
  });

  test('this test should show the children of the component <PrivateRoute />', () => {

    const uidFake = storeAppRouter.getState().auth;
    const calendarFake = storeAppRouter.getState().calendar;

    uidFake.uid = 'Testing123';

    calendarFake.event = [{
      title:"Backend Digital",
      notes:"",
      start:"2022-06-02T12:45:00.000Z",
      end: "2022-06-02T13:00:00.000Z",
      user: {
        _id:"6285455405b1fddeb0b5a999",
        name:"Leandro"

      },
      id:"62978ddd74ecd43d8c87ea48",
    }];

    const wapper = mount(
      <Provider store={storeAppRouter}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={
              <PrivateRoute>
                <CalendarApp />
              </PrivateRoute>
            } />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(wapper).toMatchSnapshot();
  });
});