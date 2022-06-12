import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from './../../hooks/useForm';
import { authStartLogin } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import logoLogin from '../../assets/login.svg';

export const Login = () => {

  const dispatch = useDispatch();
  const [msgError, setMsgError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [{ email, password }, handleChange] = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(authStartLogin(email, password, setMsgError));
  };
  
  useEffect(() => {
    if ([email, password].includes('')) {
      setButtonDisabled(true);
      return
    };
    setButtonDisabled(false)
  }, [email, password, buttonDisabled])

  return (
    <section
      className='row p-0 m-0'
      style={{ height: 100 + 'vh', width: 100 + '%' }}
    >
      <article className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
        <div className='border rounded-circle overflow-hidden shadow-sm p-3'>
          <img
            className='img-fluid'
            style={{ width: 250 + 'px' }}
            src={logoLogin}
            alt='login'
          />
        </div>

        <div className='text-center p-2 mt-3'>
          <p className='fs-5 fw-bold'> !Bienvenido a Calendar! </p>
          <small className='fw-normal fs-6'> Inicie sesión para abrir su agenda web. </small>
          <hr />
          <span className='m-0'>
            ¿No tienes cuenta? Haz click en {''}
            <Link
              to='/register'
              className='text-decoration-none'
            >
              Registrarme
            </Link>
          </span>
        </div>

      </article>
      <article className='col-md-6 bg-primary d-flex flex-column justify-content-center align-items-center'>
        <h1 className='text-white fs-3 p-4'> Inicia Sesión </h1>
        <form
          className='form-control my-5 form_container bg-white border-0 rounded p-3'
          onSubmit={handleSubmit}
        >
          <div className='mb-3 d-flex flex-column'>
            <label
              htmlFor='email'
              className='fw-normal form-label'
            >
              Correo electronico:
            </label>
            <input
              className='border-0 border-bottom form_container__field'
              id='email'
              placeholder='Ingrese su email...'
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3 d-flex flex-column'>
            <label
              htmlFor='password'
              className='fw-normal form-label'
            >
              Contraseña:
            </label>
            <input
              className='border-0 border-bottom form_container__field'
              id='password'
              placeholder='Ingrese su contraseña...'
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>

          <button
            type='submit'
            disabled={buttonDisabled}
            className={
              (buttonDisabled)
                ? 'btn btn-primary rounded p-2 form_container__button form_container__button-disabled'
                : 'btn btn-primary rounded p-2 form_container__button'}
          >
            Iniciar sesión
          </button>
          {
            (msgError !== '') && <p className='text-center mt-2 text-danger fs-6'>{msgError}</p>
          }
        </form>
      </article>
    </section>
  )
};