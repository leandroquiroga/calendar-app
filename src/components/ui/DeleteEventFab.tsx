import React from 'react'
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {

  const dispatch = useDispatch();

  // Elimina el evento
  const handleDeleteNotes = () => dispatch(eventStartDelete())

  return (
    <button
      className='btn btn-danger rounded-circle shadow button_icon__delete'
      onClick={handleDeleteNotes}
    >
      <i className="fa-solid fa-trash-can"></i>
    </button>
  )
};