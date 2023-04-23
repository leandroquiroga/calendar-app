import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo404 from '../../assets/error404.svg'

export const PageNotFound = () => {

  const navigate = useNavigate();

  const handleNavigate = () => navigate('/', { replace: true });
  return (
    <section
      className='d-flex flex-column justify-content-center align-items-center'
      style={{height: 100 + 'vh'}}
    >
      <article className='container p-2'>
        <img 
          className='d-block mx-auto img-fluid'
          style={{width: 350 + 'px'}}
          src={logo404}
          alt='logo 404'
        />
        <p className='text-center fs-3'>Lo sentimos, no se ha encontrado la URL</p>
      </article>
      <button
        className='btn btn-dark p-2'
        onClick={handleNavigate}
      >
        Regresar
      </button>
    </section>
  )
}
