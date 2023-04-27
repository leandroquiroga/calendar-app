export interface Event {
  title: string;
  notes: string;
  end: string;
  start: string;
  id?: string;
  user?: User;
}
export interface PrepareEvent {
  end: string;
  start: string;
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
    end: event.end.toString(),
    start: event.start.toString(),
  }));
};
