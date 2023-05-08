interface Event {
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


export const transfromBody = (events: Event[]) => {
  return events.map((event) => {
    // Parseamos la propiedad start en un tipo Date
    const start = new Date(Date.parse(event.start));
    // Parseamos la propiedad end en un tipo Date
    const end = new Date(Date.parse(event.end));

    return {
      ...event,
      start,
      end
    };
  })
};
