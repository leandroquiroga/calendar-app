import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { AddNewFab } from "../../../components/ui/AddNewFab";
import { store } from '../../../utilities/utilities';

import '@testing-library/jest-dom';
import "../../../setupTest";
import { uiOpenModal } from "../../../actions/actions";

jest.mock('../../../actions/actions', () => ({
  uiOpenModal: jest.fn()
})); 

store.dispatch = jest.fn();

const wapper = mount(
  <Provider store={store}>
    <AddNewFab />
  </Provider>
)
describe('Test on <AddNewFab />', () => {
  test('this test should make a to match snapshot with <AddNewFab />', () => {
    expect(wapper).toMatchSnapshot();
  });

  test('this test should simulate the click event of the button', () => {
    wapper.find('button').simulate('click');
    expect(uiOpenModal).toHaveBeenCalled()
  });
})