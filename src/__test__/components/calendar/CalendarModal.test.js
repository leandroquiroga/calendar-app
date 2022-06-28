import { mount } from 'enzyme';
import { Provider } from 'react-redux';


import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { storeModal } from '../../../utilities/utilities';

import '@testing-library/jest-dom';
import '../../../setupTest';
import {
  eventStartUpdate,
  eventStartLoading,
  clearEventActive,
  eventStartAddNew
} from '../../../actions/events';
import { act } from 'react-dom/test-utils';

jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventStartLoading: jest.fn(),
  clearEventActive: jest.fn(),
  eventStartAddNew: jest.fn()
}));

storeModal.dispatch = jest.fn();

describe('Test on component <CalendarModal />', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  const wapper = mount(
    <Provider store={storeModal}>
      <CalendarModal />
    </Provider>
  )
  
  test('this test should show the modal correctly', () => {
    expect(wapper.find('Modal').prop('isOpen')).toBeTruthy();
  });


  test('this test should open and close the modal', () => {

    const { activeEvent } = storeModal.getState().calendar;
    
    wapper.find('form').simulate('submit', {
      preventDefault() { }
    }); 
    
    expect(eventStartUpdate).toHaveBeenCalledWith(activeEvent);
    expect(clearEventActive).toHaveBeenCalled();
  });

  test('this test should show a error of the field title', () => {
    wapper.find('form').simulate('submit', {
      preventDefault() { }
    }); 
    expect(wapper.find('input[name="title"]').hasClass('form_modal__field-error')).toBe(true)
  });

/*   test('this test should create a new event', () => {
    const { calendar } = storeModal.getState();

    calendar.activeEvent = null;

    storeModal.dispatch = jest.fn();

    const wapper = mount(
      <Provider store={storeModal}>
        <CalendarModal />
      </Provider>
    )
    wapper.find('input[name="title"]').simulate('change', {
      target: {
        name: "title",
        value: "This a new event"
      }
    });
    
    wapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      "end": expect.anything(),
      "start": expect.anything(),
      "notes": "",
      "title": "This a new event"
    });

    expect(clearEventActive).toHaveBeenCalled();
  });


  test('this test should validate the date', () => {
    wapper.find('input[name="title"]').simulate('change', {
      target: {
        name: "title",
        value: "This a new event"
      }
    });

    const today = new Date();

    act(() => {
      wapper.find('DateTimePicker').at(1).prop('onChange')(today)
    });

    wapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(wapper.find('.text-center.form-text.text-danger').exists()).toBeTruthy(); 
  });
  */
});