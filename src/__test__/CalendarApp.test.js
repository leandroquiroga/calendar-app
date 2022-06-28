import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { storeAppRouter } from "../utilities/utilities";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';


import { CalendarApp } from "../CalendarApp";
import { PrivateRoute } from '../router/PrivateRoute';
import { messages_es } from "../helpers/calendar-messages-es";
import { types } from "../types/types";

import '@testing-library/jest-dom';
import '../setupTest';

storeAppRouter.dispatch = jest.fn();

describe('Test on component <CalendarApp />', () => {
  const uidFake = storeAppRouter.getState().auth;
  const calendarFake = storeAppRouter.getState().calendar;
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

  uidFake.uid = 'Testing123';

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

  const calendar = wapper.find('Calendar');

  Storage.prototype.setItem = jest.fn();
  
  test('this test should make a snapshot corretly', () => {
    expect(wapper).toMatchSnapshot();
    expect(wapper.find('.calendar_container').exists()).toBeTruthy();
  });

  test('this test should verific the properties of the <CalendarApp />', () => {

    expect(calendar.prop('messages')).toEqual(messages_es);

    expect(calendar.prop('startAccessor')).toEqual('start');
    expect(calendar.prop('endAccessor')).toEqual('end');
    expect(calendar.prop('events')).toEqual([]);
  });

  test('this test should run the event onDoubleClickEvent', () => {
    calendar.prop('onDoubleClickEvent')()
    expect(storeAppRouter.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal});
  });
  
  test('this test should run the event onSelectSlot', () => {
    calendar.prop('onSelectSlot')();
    expect(storeAppRouter.dispatch).toHaveBeenCalledWith({ type: types.clearActiveEvent });
  });

  test('this test should run the event onSelectEvent', () => {
    calendar.prop('onSelectEvent')({ event: 'Testing'});
    expect(storeAppRouter.dispatch).toHaveBeenCalledWith({ type: types.eventSetActive, payload: { event: 'Testing'}});
  });

  test('this test should run the event onView and save in the localStorage', () => {
    
    //Utilizamos el act por esta instruccion hace una modificacion en setState
    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView','week')
    });

  });
});