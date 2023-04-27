import React from 'react'
import { EventProps } from 'react-big-calendar';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export interface Event {
  title: string;
  notes: string;
  end: Date;
  start: Date;
  id?: string;
  user: User;
}
type User = {
  uid: string;
  name: string;
};

export const CalendarEvent = ( event : EventProps) => {

  const { user, notes } = useSelector((state: RootState) => state.auth);
  const { title } = event;
  return (
    <article className='d-flex flex-column justify-content-center align-content-center flex-wrap'>
      <span className='calendar_event__title'> {title} </span>
      <span className='calendar_event__name'> -{user.name} </span>
      {
        (notes) && <small className='calendar_event__notes'>{notes}</small>
      }
    </article>
  )
};