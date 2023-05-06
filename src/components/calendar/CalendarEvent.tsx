import React from 'react'
import { EventProps } from 'react-big-calendar';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export interface Event {
  title: string;
  notes: string;
  end: string;
  start: string;
  id?: string;
  user: User;
}
type User = {
  uid: string;
  name: string;
};

export const CalendarEvent = ({ event }: EventProps<Event>) => {
  const name = useSelector((state: RootState) => state.auth.name);
  return (
    <article className="d-flex flex-column justify-content-center align-content-center flex-wrap">
      <span className="calendar_event__title"> {event.title} </span>
      <span className="calendar_event__name"> -{name} </span>
      {event.notes && <small className="calendar_event__notes">{event.notes}</small>}
    </article>
  );
};