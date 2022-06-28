import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../utilities/utilities';

import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

import '@testing-library/jest-dom';
import "../../../setupTest";

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));

store.dispatch = jest.fn();

const wapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe('Test on <DeleteEventFab />', () => {

  test('this test should make snapshot correctly', () => {
    expect(wapper).toMatchSnapshot();
  });

  test('this test should simulate the click event of the button', () => {
    wapper.find('button').simulate('click');
    
    expect(eventStartDelete).toHaveBeenCalled();
  });
});