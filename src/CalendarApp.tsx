import React, { useState } from 'react'
import moment from 'moment';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';

import { uiOpenModal } from './actions/actions';
import { clearEventActive, eventSetActive } from './actions/events';
import { RootState } from './store/store';
import { messages_es } from './helpers/calendar-messages-es';

import { Navbar } from './components/ui/Navbar'
import { AddNewFab } from './components/ui/AddNewFab';
import { DeleteEventFab } from './components/ui/DeleteEventFab';
import { CalendarEvent } from './components/calendar/CalendarEvent';
import { CalendarModal } from './components/calendar/CalendarModal';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuracion en español de moment
moment.locale('es') 

// Configuracion del localizer
const localizer = momentLocalizer(moment);

export const CalendarApp = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
  const { uid } = useSelector((state: RootState) => state.auth);

  // const { user } = activeEvent;

  // Mantiene el estado de la ultima vista
  const [lastView, setLastView] = useState<any>(
    localStorage.getItem("lastView") || "month"
  );
  
  // Dispara la accion para abrir el modal
  const handleOnDoubleClick = () => dispatch(uiOpenModal());

  // Evento seleccionado
  const handleEventSelect = (e: any) => dispatch(eventSetActive(e));
  
  // Evento de cambio de vista
  const handleOnViewChange = (e: View) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = () => {
    dispatch(clearEventActive());
  };

  const eventSytleGetter = (event: any) => {
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
        popup={true}
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