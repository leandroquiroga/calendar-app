import React from 'react'

export const CalendarEvent = ({ event }) => {

  const { title, user, notes } = event;
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