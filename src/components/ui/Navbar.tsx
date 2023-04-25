import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startUserLogut } from '../../actions/auth';

export const Navbar = (): JSX.Element => {
  
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleSingOut = () => dispatch(startUserLogut());
  
  return (
    <nav className='navbar navbar-primary bg-primary'>
      <section className='container-fluid'>
        <span className='text-white text-capitalize'>Hola, {auth.name} !</span>
        <button
          className='btn btn-outline-light p-2 rounded'
          onClick={handleSingOut}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span> Logout </span>
        </button>
      </section>
    </nav>
  )
};