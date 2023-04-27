import React, { useState } from "react";
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { Input } from '../form/Input';
import { Button } from '../form/Button';
import { authStartLogin } from '../../actions/auth';
import logoLogin from '../../assets/login.svg';

export interface InitialValues {
  email: string;
  password: string;
}

export const valueForm: InitialValues = {
  email: '',
  password: '',
};

export const Login = () => {

  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const [msgError, setMsgError] = useState<string>('');


  const handleSubmit = ( values: InitialValues) => {
    const { email, password } = values;
    dispatch(authStartLogin(email, password, setMsgError));
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
            style={{ width: 250 + "px" }}
            src={logoLogin}
            alt="login"
          />
        </div>

        <div className="text-center p-2 mt-3">
          <p className="fs-5 fw-bold"> Bienvenido a Calendar </p>
          <small className="fw-normal fs-6">
            {" "}
            Inicie sesión para abrir su agenda web.{" "}
          </small>
          <hr />
          <span className="m-0">
            ¿No tienes cuenta? Haz click en {""}
            <Link to="/register" className="text-decoration-none">
              Registrarme
            </Link>
          </span>
        </div>
      </article>
      <article className="col-md-6 bg-primary d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white fs-3 p-4"> Inicia Sesión </h1>

        <Formik
          initialValues={valueForm}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formik) => (
            <Form
              className="form-control my-5 form_container bg-white border-0 rounded p-3"
              noValidate
            >
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

              <Button
                type="submit"
                styles="btn btn-primary rounded p-2 form_container__button"
                value="Iniciar sesión"
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