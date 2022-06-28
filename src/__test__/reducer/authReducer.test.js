import { authReducer } from "../../reducer/authReducer";
import { types } from "../../types/types";


const initiState = {
  checking: true
};

describe('Test on authReducer.js', () => {

  test('this test should return the state by defualt', () => {
    const state = authReducer(initiState, {});
    expect(state).toEqual(initiState);
  });

  test('this test should allow user to login', () => {
    const user = {
      uid: 'testing123',
      name: 'Tester'
    };    

    const actionLogin = {
      type: types.authLogin,
      payload: user
    };

    const state = authReducer(initiState, actionLogin);
    expect(state).toEqual({
      checking: false,
      uid: user.uid,
      name: user.name
    });
  });

  test('this test should allow user to logout', () => {
    const actionLogout = {
      type: types.authLogout
    };

    const state = authReducer(initiState, actionLogout);
    expect(state).toEqual({checking: false})
  });

  test('this test should change the state of checking to false', () => {
    const actionCheckingFinish = {
      type: types.authChekingFinish
    };
  
    const state = authReducer(initiState, actionCheckingFinish);
    expect(state).toEqual({ checking: false });
  });
});