import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { startUserLogut } from "../../../actions/auth";
import { Navbar } from "../../../components/ui/Navbar";
import { storeNabvar } from '../../../utilities/utilities';

import '@testing-library/jest-dom';
import '../../../setupTest';

jest.mock('../../../actions/auth', () => ({
  startUserLogut: jest.fn()
})); 

storeNabvar.dispatch = jest.fn();

const wapper = mount(
  <Provider store={storeNabvar}>
    <Navbar/>
  </Provider>
);


describe('Test on <Navbar />', () => {
  
  test('this test should make a snapshot with <Navabar /> correctly', () => {
    expect(wapper).toMatchSnapshot();
  });

  test('this test should simulate a click in the button', () => {
    wapper.find('button').simulate('click');
    
    expect(startUserLogut).toHaveBeenCalled();
  });
});