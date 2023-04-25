import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/actions';

export const AddNewFab = (): JSX.Element => {

  const dispatch = useDispatch();
  // Abre el modal 
  const handleOpenModal = () => dispatch(uiOpenModal())
  
  return (
    <button
      className='btn btn-primary shadow rounded-circle button_icon'
      onClick={handleOpenModal}
    >
      <i className="fa-solid fa-plus"></i>
    </button>
  )
};