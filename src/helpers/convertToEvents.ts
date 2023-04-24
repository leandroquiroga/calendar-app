export interface Event {
  title: string;
  notes: string;
  end: Date;
  start: Date;
  id?: string;
  user?: User;
}
export interface PrepareEvent {
  end: Date;
  start: Date;
  title: string;
  notes: string;
  id?: string;
  user?: User;
}

type User = {
  uid: string;
  name: string;
};

export const convertToEvent = (preparedEvent: PrepareEvent[]): Event[] => {
  return preparedEvent.map((event) => ({
    ...event,
    title: event.title || "",
    notes: event.notes || "",
    end: event.end,
    start: event.start,
  }));
};
