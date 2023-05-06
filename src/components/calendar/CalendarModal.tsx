import React, { useEffect, useState } from 'react'
import { customStylesModal } from '../../helpers/customStylesModal';

import Modal from 'react-modal';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/actions';
import { clearEventActive, eventStartAddNew, eventStartLoading, eventStartUpdate } from '../../actions/events';
import { RootState } from '../../store/store';
import { Form, Formik } from 'formik';
import { InputDate } from '../form/InputDate';
import { Input } from '../form/Input';
import { TextArea } from '../form/TextArea';
import { Button } from '../form/Button';

// Obtenemos el id #root para el modal
(process.env.NODE_ENV !== 'test') && Modal.setAppElement('#root');
// Valor inicial de la fecha
const nowDateStart = moment().minutes(0).seconds(0).add(1, 'hours');
// Valor final de la fecha
const nowDateEnd = nowDateStart.clone().add(1, 'hours');
export interface CalendarInitialValue {
  title: string ;
  notes: string ;
  end: string ;
  start: string ;
};

// Valor inicial del formulario
const initalValue: CalendarInitialValue = {
  title: "",
  notes: "",
  end: nowDateEnd.toDate().toISOString(),
  start: nowDateStart.toDate().toISOString(),
};
export const CalendarModal = () => {

  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state: RootState) => state.ui);
  const { activeEvent } = useSelector((state: RootState) => state.calendar);
  // const state = useSelector((state: RootState) => state);

  // Mantiene el estado de la fecha inicial seleccionada
  const [startDate, setStartDate] = useState<Date>(nowDateStart.toDate());
  const [errorMsgDate, setErrorMsgDate] = useState<boolean>(false)

  // Mantiene el estado de la fecha final seleccionada
  const [endDate, setEndDate] = useState<Date>(nowDateEnd.toDate());
  const [errorTitle, setErrorTitle] = useState<boolean>(true);

  // Propiedades iniciales del formulario
  const [formValues, setFormValues] = useState<CalendarInitialValue>(initalValue || activeEvent);
  // const { title, start, end } = formValues;

  // Al abrir el modal,
  // si exite el activeEvent coloca los valores al formulario
  // sino reinicia al estado inicial el formulario
  useEffect(() => {
    activeEvent ? setFormValues(activeEvent) : setFormValues(initalValue);
  }, [activeEvent]);

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  // Dispara la accion para cerrar el modal, limpia el formulario
  // y reinicia el esta de propiedad activeEvent
  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initalValue);
    dispatch(clearEventActive())
  }

  const handleSubmitNewEvent = (e: CalendarInitialValue) => {
    // Variables de las fechas inicio y fin
    const momentStart = moment(e.start);
    const momentEnd = moment(e.end);

    // Valida que la hora de finalizacion del evento no sea
    // menor al de la inicializacion
    if (momentStart.isSameOrAfter(momentEnd)) {
      return setErrorMsgDate(true);
    }

    setErrorTitle(false);
    // Corregir este choclo mañana Urgente !
    if (e.title.trim().length < 2) {
      return setErrorTitle(false);
    }
    //Actualiza el evento o realiza la grabacion del evento
    activeEvent ? dispatch(eventStartUpdate(e)) : dispatch(eventStartAddNew(e));
    setErrorTitle(true);
    closeModal();
  };

  // Cambia el valor de la fecha inicial seleccionada y del campo start
  const handleStartDateChange = (e: any) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  // Cambia el valor de la fecha final seleccionada y del campo end
  const handleEndDateChange = (e: any) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  return (
    <article className="d-flex justify-content-center">
      <Modal
        className="modal_container"
        ariaHideApp={process.env.NODE_ENV !== "test"}
        closeTimeoutMS={200}
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        overlayClassName="modal_container__fondo"
        style={customStylesModal}
      >
        <h1 className="font-bold text-center fs-5">
          {activeEvent ? "Editar Evento" : "Nueva Evento"}
        </h1>
        <hr />

        <Formik
          initialValues={formValues}
          onSubmit={(values) => handleSubmitNewEvent(values)}
        >
          {(formik) => (
            <Form noValidate className="container">
              <InputDate
                date={startDate}
                handleDateChage={handleStartDateChange}
                label="Fecha y hora inicio"
                placeholder="Fecha inicio..."
                styles="form_modal__field"
              />

              <InputDate
                date={endDate}
                minDate={startDate}
                handleDateChage={handleEndDateChange}
                label="Fecha y hora fin"
                placeholder="Fecha fin.."
                styles="form_modal__field"
              />
              {errorMsgDate && (
                <small className="text-center form-text text-danger">
                  La hora es incorrecta
                </small>
              )}

              <Input
                label="Titulo y notas"
                name="title"
                styles="form_modal__field"
                errorTitle={errorTitle}
                placeholder="Titulo del evento"
                type="text"
              />
              {errorTitle ? (
                <small className="form-text text-muted">
                  {" "}
                  Una descripcion corta
                </small>
              ) : (
                <small className="form-text text-danger">
                  {" "}
                  Debe colocar un titulo{" "}
                </small>
              )}

              <TextArea
                name="notes"
                placeholder="Escriba su nota"
                rows={5}
                styles="form_modal__field"
                text="Una descripcion corta (opcional)"
              />

              <Button
                type="submit"
                styles="btn btn-danger btn-block form_modal__button"
                children={<i className="far fa-save"></i>}
                value="Guardar"
              />
            </Form>
          )}
        </Formik>
      </Modal>
    </article>
  );
}