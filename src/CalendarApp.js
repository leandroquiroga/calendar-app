import React, { useState } from 'react'
import { Navbar } from './components/ui/Navbar'
import { messages_es } from './helpers/calendar-messages-es';
import { CalendarEvent } from './components/calendar/CalendarEvent';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarModal } from './components/calendar/CalendarModal';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from './actions/actions';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';
import 'moment/locale/es';
import { clearEventActive, eventSetActive } from './actions/events';
import { AddNewFab } from './components/ui/AddNewFab';
import { DeleteEventFab } from './components/ui/DeleteEventFab';

// Configuracion en español de moment
moment.locale('es') 

// Configuracion del localizer
const localizer = momentLocalizer(moment);

export const CalendarApp = () => {

  const dispatch = useDispatch();
  const { events, activeEvent  } = useSelector(state => state.calendar);

  // Mantiene el estado de la ultima vista
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  
  // Dispara la accion para abrir el modal
  const handleOnDoubleClick = () => {
    dispatch(uiOpenModal());
  }
  
  // Evento seleccionado
  const handleEventSelect = (e) => {
    dispatch(eventSetActive(e));
  };

  // Evento de cambio de vista
  const handleOnViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = e => {
    dispatch(clearEventActive())
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
        events={events}
        messages={messages_es}
        eventPropGetter={eventSytleGetter}
        startAccessor='start'
        endAccessor='end'
        step={15}
        onSelectEvent={handleEventSelect}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={handleOnViewChange}
        view={ lastView }
        onDoubleClickEvent={handleOnDoubleClick}
        components={{
          event: CalendarEvent,
        }}
      />

      <CalendarModal />

      <AddNewFab />
      {
        (activeEvent) && <DeleteEventFab/>
      }

    </section>
  )
}
