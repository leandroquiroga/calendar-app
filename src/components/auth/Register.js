import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from './../../hooks/useForm';
import logoRegister from '../../assets/register.svg'
import { useDispatch } from 'react-redux';
import { startRegister } from '../../actions/auth';

export const Register = () => {

  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [msgError, setMsgError] = useState('');

  
  const [value, handleChange] = useForm({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { email, password, name, passwordConfirm } = value;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setMsgError('Las contraseñas deben ser iguales');
    }
    dispatch(startRegister(email, password, name, setMsgError))
  };

  useEffect(() => {
    if ([email, password, name, passwordConfirm].includes('')) {
      setButtonDisabled(true);
      return
    };

    setButtonDisabled(false)
  }, [email, password, name, passwordConfirm, buttonDisabled])
  return (
    <section
      className='row p-0 m-0'
      style={{ height: 100 + 'vh', width: 100 + '%' }}
    >
      <article className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
        <div className='border rounded-circle overflow-hidden shadow-sm p-3'>
          <img
            className='img-fluid'
            style={{ width: 250 + 'px', height: 250 + 'px' }}
            src={logoRegister}
            alt='register'
          />
        </div>

        <div className='text-center p-2 mt-3'>
          <p className='fs-5 fw-bold'> !Bienvenido a Calendar! </p>
          <small className='fw-normal fs-6'> Registrate para crear tu agenda web. </small>
          <hr />
          <span className='m-0'>
            ¿Tienes cuenta? Haz click en {''}
            <Link
              to='/login'
              className='text-decoration-none'
            >
              Inicia sesión
            </Link>
          </span>
        </div>

      </article>
      <article className='col-md-6 bg-primary d-flex flex-column justify-content-center align-items-center'>
        <h1 className='text-white fs-3 p-4'> Registrarte </h1>
        <form
          className='form-control my-5 form_container bg-white border-0 rounded p-3'
          onSubmit={handleSubmit}
        >
          <div className='mb-3 d-flex flex-column'>
            <label
              htmlFor='name'
              className='fw-normal form-label'
            >
              Nombre
            </label>
            <input
              className='border-0 border-bottom form_container__field'
              id='name'
              placeholder='Ingrese su nombre...'
              type='text'
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
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
          <div className='mb-3 d-flex flex-column'>
            <label
              htmlFor='passwordConfirm'
              className='fw-normal form-label'
            >
              Repetir contraseña:
            </label>
            <input
              className='border-0 border-bottom form_container__field'
              id='passwordConfirm'
              placeholder='Repita su contraseña...'
              type='password'
              name='passwordConfirm'
              value={passwordConfirm}
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
            Registrarme
          </button>
          {
            (msgError !== '') && <p className='text-center mt-2 text-danger fs-6'>{msgError}</p>
          }
        </form>
      </article>
    </section>
  )
};