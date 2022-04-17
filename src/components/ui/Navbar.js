import React from 'react'

export const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <section className='container-fluid'>
        <span className='text-white'>Hola, Leandro !</span>
        <button className='btn btn-danger p-2 rounded'>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span> Logout </span>
        </button>
      </section>
    </nav>
  )
}
