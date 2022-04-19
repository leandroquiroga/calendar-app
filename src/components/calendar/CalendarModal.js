import React, { useState } from 'react'
import Modal from 'react-modal';
import { customStylesModal } from '../../helpers/customStylesModal';

// Obtenemos el id #root para el modal
Modal.setAppElement('#root');

export const CalendarModal = () => {

  // let subtitle;
  // Controla el estado del modal
  const [openIsModal, setOpenIsModal] = useState(true);

  // const afterOpenModal = () => subtitle.style.color = '#F00';

  // Setea el modal en false 
  const closeModal = () => setOpenIsModal(false);

  // Setea el modal en true
  // const openModal = () => setOpenIsModal(true);

  return (
    <article>
      <Modal
        isOpen={openIsModal}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesModal}
        className='modal_container'
        overlayClassName='modal_container__fondo'
        closeTimeoutMS={200}
      > 
        <h1>Hola desde el modal</h1>
        <hr />
        
        <span>Que onda?</span>
      </Modal>
    </article>
  )
}
