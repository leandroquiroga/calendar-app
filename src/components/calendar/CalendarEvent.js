import React from 'react'

export const CalendarEvent = ({ event }) => {

  const { title, user, notes } = event;
  return (
    <article className='d-flex flex-column justify-content-center'>
      <span className='my-1 fs-5'> {title} </span>
      <strong className='my-1 fs-6'> -{user.name} </strong>
      <small className='my-1 fs-6'>{ notes }</small>
    </article>
  )
}
