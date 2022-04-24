import React, { useState } from 'react'
import { customStylesModal } from '../../helpers/customStylesModal';

import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/actions';

// Obtenemos el id #root para el modal
Modal.setAppElement('#root');

// Valor inicial de la fecha
const nowDateStart = moment().minutes(0).seconds(0).add(1, 'hours');

// Valor final de la fecha
const nowDateEnd = nowDateStart.clone().add(1, 'hours');


export const CalendarModal = () => {
  
  const dispatch = useDispatch();
  const { modalOpen } = useSelector(state => state.ui);

  // Mantiene el estado de la fecha inicial seleccionada 
  const [startDate, setStartDate] = useState(nowDateStart.toDate());
  
  // Mantiene el estado de la fecha final seleccionada
  const [endDate, setEndDate] = useState(nowDateEnd.toDate());

  const [errorTitle, setErrorTitle] = useState(true);
  
  // Propiedades iniciales del formulario 
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    end: nowDateEnd.toDate(),
    start: nowDateStart.toDate(),
  });

  // Dispara la accion para cerrar el modal
  const closeModal = () => dispatch(uiCloseModal())
  const { title, notes, start, end} = formValues;
  
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  };


  const handleSubmitNewEvent = (e) => {
    e.preventDefault();

    // Variables de las fechas inicio y fin
    const momentStart = moment(start);
    const momentEnd = moment(end);


    // Valida que la hora de finalizacion del evento no sea
    // menor al de la inicializacion
    if (momentStart.isSameOrAfter(momentEnd)) { 
      console.log('Hora incorrecta')
    }

    // Corregir este choclo mañana Urgente ! 
    if (title.trim().length < 2) {
      return setErrorTitle(false);
    };

    setErrorTitle(true);
    closeModal()
  }
  
  // Cambia el valor de la fecha inicial seleccionada y del campo start
  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  // Cambia el valor de la fecha final seleccionada y del campo end
  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    })
  };

  return (
    <article className='d-flex justify-content-center'>
      <Modal
        className='modal_container'
        closeTimeoutMS={200}
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        overlayClassName='modal_container__fondo'
        style={customStylesModal}
      > 
        <h1 className='font-bold text-center fs-5'> Nuevo Evento </h1>
        <hr />
        <form
          className='container'
          onSubmit={handleSubmitNewEvent}
        >
          
          <div className='form-group my-1'>
            <label
              className='form-label'
            >
              Fecha y hora inicio
            </label>
            <DateTimePicker
              className='form_modal__field'
              onChange={handleStartDateChange}
              placeholder='Fecha inicio...'
              value={startDate}
            />
          </div>

          <div className='form-group my-1'>
            <label
              className='form-label'
            >
              Fecha y hora fin
            </label>
            <DateTimePicker
              className='form_modal__field'
              minDate={startDate}
              onChange={handleEndDateChange}
              placeholder='Fecha fin...'
              value={endDate}
            />
          </div>
          <hr />

          <div className='form-group my-1'>
            <label
              className='form-label'
              htmlFor='inputTitle'
            >
              Titulo y notas
            </label>
            <input 
              autoComplete='off'
              className={`form_modal__field ${ !errorTitle && 'form_modal__field-error' }`}
              name='title'
              onChange={handleInputChange}
              placeholder='Titulo del evento'
              type='text'
              value={title}
            />
            {(errorTitle)
              ? <small className='form-text text-muted'> Una descripcion corta</small>
              : <small className='form-text text-danger'> Debe colocar un titulo </small>
            }
          </div>

          <div className='form-group my-1'>
            <textarea
              className='form_modal__field'
              name='notes'
              onChange={handleInputChange}
              placeholder='Escriba su nota'
              rows='5'
              type='text'
              value={notes}
            ></textarea>
             <small className='form-text text-muted'> Una descripcion corta (opcional)</small>
          </div>

          <button
            className="btn btn-danger btn-block form_modal__button"
            type="submit"
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>

        </form>
      </Modal>

    </article>
  )
}