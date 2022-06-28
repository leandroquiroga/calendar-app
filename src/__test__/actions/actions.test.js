import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { types } from '../../types/types';
import { uiCloseModal, uiOpenModal } from '../../actions/actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

describe('Test on actions.js', () => {
  

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });


  test('this test should run the action uiOpenModal correctly', () => {
  
    store.dispatch(uiOpenModal());
    const action = store.getActions();

    expect(action[0]).toEqual({type: types.uiOpenModal});

  });
  test('this test should run the action uiCloseModal correctly', () => {
    
    store.dispatch(uiCloseModal());
    const action = store.getActions();

    expect(action[0]).toEqual({type: types.uiCloseModal});
  });
});