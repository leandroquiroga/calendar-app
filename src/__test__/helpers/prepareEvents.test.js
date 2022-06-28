import { prepareEvents } from "../../helpers/prepareEvents";


const eventMock = [{
  title: 'Backend Digital',
  notes: '',
  start: '2022-06-02T12:45:00.000+00:00',
  end: '2022-06-02T13:00:00.000+00:00',
  user: {
    _id: '231u4gh79wdyhsaud',
    name: 'Pepe',
  },
  id: '234jkasdj9034asd',
}];

describe('Test on prepareEvents.js', () => { 
  const prepareEventMock = jest.fn();

  prepareEventMock.mockImplementation((eventMockArg = []) => {
    return eventMockArg.map(
      event => ({
        ...event,
        end: '23/03/11',
        start: '22/03/11'
      })
    );
  });

  test('this test should show the type of prepareEvent', () => {
    expect(typeof prepareEvents).toBe("function");
  });

  test('this test should return the property end and start modified', () => {
    const newArrayModified = prepareEvents(eventMock);  

    expect(newArrayModified[0].start).not.toEqual(eventMock[0].start);
    expect(newArrayModified[0].end).not.toEqual(eventMock[0].end);
  });

  test('this test should called the function correctly', () => {
    prepareEventMock(eventMock);
    expect(prepareEventMock).toBeCalledTimes(1);
  });

  test('this test should the called the function with at least with a event', () => {
    prepareEventMock(eventMock);
    expect(prepareEventMock).toBeCalledWith(eventMock);
  });
});