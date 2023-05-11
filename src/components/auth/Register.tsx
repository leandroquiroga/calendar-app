import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logoRegister from '../../assets/register.svg'
import { startRegister } from '../../actions/auth';
import { AnyAction, Dispatch } from 'redux';
import { Form, Formik } from 'formik';
import { Input } from '../form/Input';
import { Button } from '../form/Button';

export interface ValueRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const valueRegister: ValueRegister = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const Register = () => {

  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const [msgError, setMsgError] = useState<string>('');

  
  const handleSubmit = ( values: ValueRegister) => {
    // e.preventDefault();

    const { email, name, password, passwordConfirm } = values;

    if (password !== passwordConfirm) {
      return setMsgError("Las contraseñas deben ser iguales");
    }
    dispatch(startRegister(email, password, name, setMsgError));
  };

  return (
    <section
      className="row p-0 m-0"
      style={{ height: 100 + "vh", width: 100 + "%" }}
    >
      <article className="col-md-6 d-flex flex-column justify-content-center align-items-center">
        <div className="border rounded-circle overflow-hidden shadow-sm p-3">
          <img
            className="img-fluid"
            style={{ width: 250 + "px", height: 250 + "px" }}
            src={logoRegister}
            alt="register"
          />
        </div>

        <div className="text-center p-2 mt-3">
          <p className="fs-5 fw-bold"> !Bienvenido a Calendar! </p>
          <small className="fw-normal fs-6">
            {" "}
            Registrate para crear tu agenda web.{" "}
          </small>
          <hr />
          <span className="m-0">
            ¿Tienes cuenta? Haz click en {""}
            <Link to="/login" className="text-decoration-none">
              Inicia sesión
            </Link>
          </span>
        </div>
      </article>
      <article className="col-md-6 bg-primary d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white fs-3 p-4"> Registrarte </h1>
        <Formik
          initialValues={valueRegister}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formik) => (
            <Form
              noValidate
              className="form-control my-5 form_container bg-white border-0 rounded p-3"
            >
              <Input
                label="Name"
                name="text"
                type="text"
                styles="border-0 border-bottom form_container__field"
                placeholder="Ingrese su nombre"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                styles="border-0 border-bottom form_container__field"
                placeholder="Ingrese su correo electronico"
              />
              <Input
                label="Contraseña"
                name="password"
                type="password"
                styles="border-0 border-bottom form_container__field"
                placeholder="Ingrese su contraseña"
              />
              <Input
                label="Contraseña"
                name="passwordConfirm"
                type="password"
                styles="border-0 border-bottom form_container__field"
                placeholder="Confirme su contraseña"
              />
              <Button
                type="submit"
                styles="btn btn-primary rounded p-2 form_container__button"
                value="Registrarse"
              />
              {msgError !== "" && (
                <p className="text-center mt-2 text-danger fs-6">{msgError}</p>
              )}
            </Form>
          )}
        </Formik>
      </article>
    </section>
  );
};