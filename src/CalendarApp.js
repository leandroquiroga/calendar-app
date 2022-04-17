import React, { useState } from 'react'
import { Navbar } from './components/ui/Navbar'
import { messages_es } from './helpers/calendar-messages-es';
import { CalendarEvent } from './components/calendar/CalendarEvent';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';
import 'moment/locale/es';

// Configuracion en español de moment
moment.locale('es') 

// Configuracion del localizer
const localizer = momentLocalizer(moment);


// Lista de eventos provisoria
const event = [
  {
    title: 'Cita',
    notes: 'Llevar el mate',
    start: moment().toDate(),
    end: moment().add(4, 'hours').toDate(),
    user: {
      id: '245634',
      name: 'Leandro',
      email: 'leandro@correo.com'
    }
  }
];

export const CalendarApp = () => {
  // Mantiene el estado de la ultima vista
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  
  // Evento doble click
  const handleOnDoubleClick = (e) => console.log(e);
  
  // Evento seleccionado
  const handleEventSelect = (e) => console.log(e);

  // Evento de cambio de vista
  const handleOnViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const eventSytleGetter = (event, start, end, isSelect) => {
    // console.log(event, start, end, isSelect);

    const style = {
      backgroundColor: '#202020',
      borderRadius: '0px',
      color: 'white',
      opacity: 0.9,
      outlineColor: '#bcbcbc',
    };

    return {
      style,
    }
  }
  return (
    <section className='calendar_container'>
      <Navbar />

      <Calendar 
        localizer={localizer}
        events={event}
        messages={messages_es}
        eventPropGetter={eventSytleGetter}
        startAccessor='start'
        endAccessor='end'
        step={15}
        onSelectEvent={handleEventSelect}
        onView={handleOnViewChange}
        view={ lastView }
        onDoubleClickEvent={handleOnDoubleClick}
        components={{
          event: CalendarEvent,
        }}
      />
    </section>
  )
}
