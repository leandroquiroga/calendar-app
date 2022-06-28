import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Login } from '../../../components/auth/Login';
import { PublicRoute } from '../../../router/PublicRoute';
import { authStartLogin } from '../../../actions/auth';

import '@testing-library/jest-dom';
import '../../../setupTest';

jest.mock('../../../actions/auth', () => ({
  authStartLogin: jest.fn()
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: null
  }
};
let store = mockStore(initState);

store.dispatch = jest.fn();

const wapper = mount(
  <Provider store={store}>
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


describe('Test on <Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('this test should make a snapshot with component', () => {
    expect(wapper).toMatchSnapshot();
  });

  test('this test should show atributte disabled of the button in true', () => {
    const btn = wapper.find('button');
    expect(btn.props().disabled).toBeTruthy();
  });

  test('this test should run the dispatch of authStartLogin', async () => {


    wapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'tester@testing.com'
      }
    });

    wapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: '123456'
      }
    });

    const btn = wapper.find('button');
    expect(btn.props().disabled).not.toBeTruthy();

    wapper.find('form').prop('onSubmit')({
      preventDefault() { }
    });

    expect(authStartLogin).toHaveBeenCalled();
  });
});