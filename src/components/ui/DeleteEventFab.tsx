import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = (): JSX.Element => {

  const dispatch = useDispatch();

  // Elimina el evento
  const handleDeleteNotes = () => {
    
    //Sweet Alert 2
    Swal.fire({
      title: 'Estas seguro de eliminar este evento?',
      text: 'Una vez que se elimina, el evento no existira mas en su calendario',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#FF0000',
      confirmButtonColor: '#3074b3',
      confirmButtonText: 'Si, eliminar evento',
    }).then( response => {
      if (response.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Este evento fue eliminado',
          'success'
        )
        dispatch(eventStartDelete())
      };  
    } )
    
  
  }

  return (
    <button
      className='btn btn-danger rounded-circle shadow button_icon__delete'
      onClick={handleDeleteNotes}
    >
      <i className="fa-solid fa-trash-can"></i>
    </button>
  )
};