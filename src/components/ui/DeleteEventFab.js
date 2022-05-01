import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventNotes } from '../../actions/events';


export const DeleteEventFab = () => {

  const dispatch = useDispatch();
  const {activeEvent} = useSelector(state => state.calendar)

  // Elimina el evento
  const handleDeleteNotes = () => dispatch(deleteEventNotes(activeEvent.id))

  return (
    <button
      className='btn btn-danger rounded-circle shadow button_icon__delete'
      onClick={handleDeleteNotes}
    >
        <i className="fa-solid fa-trash-can"></i>
    </button>
  )
}
