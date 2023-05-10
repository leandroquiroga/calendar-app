export interface Event {
  title: string;
  notes: string;
  end: string;
  start: string;
  id?: string;
  user?: User;
};

type User = {
  uid: string;
  name: string;
};

export const prepareEvents = (events: Event[]): Event[] => {
  // Retorna el arreglo de evento pero con las propiedades end y start en un objeto tipo Date
  return events.map((event: Event) => ({
    ...event,
    end: new Date(event.end).toISOString(),
    start: new Date(event.start).toISOString()
  }));
};