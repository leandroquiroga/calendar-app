export interface PrepareEvent {
  end: Date | string;
  start: Date | string;
  title: string;
  notes: string;
  id?: string;
  user?: User;
};

// export interface ConvertEvent {
//   end: string;
//   start: string;
//   title: string;
//   notes: string;
//   id?: string;
//   user?: User;
// }

type User = {
  uid: string;
  name: string;
};

export const convertToEvent = (preparedEvent: PrepareEvent[]): PrepareEvent[] => {
  return preparedEvent.map((event) => ({
    ...event,
    title: event.title || "",
    notes: event.notes || "",
    end: new Date(event.end),
    start: new Date(event.start),
  }));
};
