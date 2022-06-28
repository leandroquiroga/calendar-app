import { mount } from "enzyme";
import { CalendarEvent } from "../../../components/calendar/CalendarEvent";

import '@testing-library/jest-dom';
import '../../../setupTest';


describe('Test on component <CalendarEvent />', () => {
  const event = {
    title:"Testing",
    notes:"This test should run correctly",
    start:"2022-06-02T12:45:00.000Z",
    end: "2022-06-02T13:00:00.000Z",
    user: {
      _id:"6285455405b1fddeb0b5a999",
      name:"Leandro"

    },
    id:"62978ddd74ecd43d8c87ea48",
  };
  
  test('this test should make a snapshot correctly', () => { 
    const wapper = mount(<CalendarEvent event={event} />); 
    expect(wapper).toMatchSnapshot();
  });
});