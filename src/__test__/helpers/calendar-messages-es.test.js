import { messages_es } from "../../helpers/calendar-messages-es";
jest.mock("../../helpers/calendar-messages-es");


describe('Test on calendar-messages-es.js', () => {
  const mockMessageEs = jest.mocked(messages_es, true);
  
  test('this test should be equal the calendar-messages-es.js', () => {
    expect(messages_es).toEqual(mockMessageEs);
  });
  
  test('this test should to show the method showMore()', () => {
    expect(mockMessageEs).toHaveProperty('showMore');
  });
  
  test('this test should the property allDay with it is value Todo el dia', () => {
    expect(mockMessageEs).toHaveProperty('allDay', 'Todo el día');
  });

  test('this test should chek that the property noEventsInRange is not undefined', () => {
    expect(mockMessageEs.noEventsInRange).not.toBeUndefined();
  });
});