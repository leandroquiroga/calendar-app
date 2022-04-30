import React from 'react'

export const CalendarEvent = ({ event }) => {

  const { title, user } = event;
  return (
    <article className='d-flex flex-column justify-content-center'>
      <span> {title} </span>
      <strong>- { user.name } </strong>
    </article>
  )
}
