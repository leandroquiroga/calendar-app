import moment from "moment";  
export interface Event {
  title: string;
  notes: string;
  end: Date;
  start: Date;
  id?: string;
  user?: User;
}
export interface PreparedEvent {
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

export const prepareEvents = (events: Event[]): PreparedEvent[] => {
  // Retorna el arreglo de evento pero con las propiedades end y start en un objeto tipo Date
  return events.map((event) => ({
    ...event,
    end: moment(event.end).toDate(),
    start: moment(event.start).toDate(),
  }));
};