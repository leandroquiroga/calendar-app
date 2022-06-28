import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Register } from '../../../components/auth/Register';
import { PublicRoute } from '../../../router/PublicRoute';
import { startRegister } from '../../../actions/auth';

import '@testing-library/jest-dom';
import '../../../setupTest';

jest.mock('../../../actions/auth', () => ({
  startRegister: jest.fn()
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
          <Register />
        </PublicRoute>
        }/>
    </Routes>
    </MemoryRouter>
  </Provider>
);


describe('Test on Component <Register />', () => {
  
  test('this test should mack a snapshot correctly', () => {
    expect(wapper).toMatchSnapshot()
  });

  test('this test should show atributte disabled of the button in true', () => {
    const btn = wapper.find('button');
    expect(btn.props().disabled).toBeTruthy();
  });
  test('this test should run the dispatch of authStartLogin', async () => {

    wapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'tester'
      }
    });
    
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

    wapper.find('input[name="passwordConfirm"]').simulate('change', {
      target: {
        name: 'passwordConfirm',
        value: '123456'
      }
    })

    const btn = wapper.find('button');
    expect(btn.props().disabled).not.toBeTruthy();

    wapper.find('form').prop('onSubmit')({
      preventDefault() { }
    });

    expect(startRegister).toHaveBeenCalled();
  });

  test('this test should make match two the passwords', () => {
    const setMsgError = jest.fn(() => 'Las contraseñas deben ser iguales');
    
    const name = wapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'tester'
      }
    });
    
    const email = wapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'tester@testing.com'
      }
    });
    const passOne = wapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: '123456'
      }
    });

    const passTwo = wapper.find('input[name="passwordConfirm"]').simulate('change', {
      target: {
        name: 'passwordConfirm',
        value: '123456'
      }
    })
    passOne.props().value = "456789";

    expect(startRegister).not.toHaveBeenCalledWith(email.props().value, passOne.props().value, name.props().value, setMsgError);
    expect(Number(passTwo.props().value)).not.toBe(Number(passOne.props().value));
  })
})