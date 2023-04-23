import moment from "moment";  


export const prepareEvents = (events = []) => {

  // Retorna el arreglo de evento pero con las propiedades end y start en un objeto tipo Date
  return events.map(
    (event) => ({
      ...event,
      end: moment(event.end).toDate() ,
      start:moment(event.start).toDate() ,
    })
  )
};