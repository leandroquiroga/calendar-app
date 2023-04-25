import React, { ChangeEvent, useState } from 'react'
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from './components/ui/Navbar'
import { messages_es } from './helpers/calendar-messages-es';
import { CalendarEvent } from './components/calendar/CalendarEvent';
import { CalendarModal } from './components/calendar/CalendarModal';
import { uiOpenModal } from './actions/actions';
import { clearEventActive, eventSetActive } from './actions/events';
import { AddNewFab } from './components/ui/AddNewFab';
import { DeleteEventFab } from './components/ui/DeleteEventFab';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Configuracion en español de moment
moment.locale('es') 

// Configuracion del localizer
const localizer = momentLocalizer(moment);

export const CalendarApp = () => {

  const dispatch = useDispatch();
  console.log(dispatch)
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  // const { user } = activeEvent;

  // Mantiene el estado de la ultima vista
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  
  // Dispara la accion para abrir el modal
  const handleOnDoubleClick = () => dispatch(uiOpenModal());

  // Evento seleccionado
  const handleEventSelect = (e: ChangeEvent<HTMLInputElement>) => dispatch(eventSetActive(e));
  
  // Evento de cambio de vista
  const handleOnViewChange = (e: any) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(clearEventActive());
  };

  const eventSytleGetter = (event, start, end, isSelect) => {
    
    const { user } = event;

    const style = {
      backgroundColor: (uid === user._id) ? '#1b61db' : '#202020',
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
        step={7.5}
        onSelectEvent={handleEventSelect}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={handleOnViewChange}
        view={lastView}
        onDoubleClickEvent={handleOnDoubleClick}
        components={{
          event: CalendarEvent,
        }}
      />

      <CalendarModal />

      <AddNewFab />

      {(activeEvent)
        ? (activeEvent.user._id === uid) && <DeleteEventFab />
        : null
      }

    </section>
  )
};