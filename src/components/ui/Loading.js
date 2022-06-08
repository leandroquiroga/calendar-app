import React from 'react'

export const Loading = () => {
  return (
    <section className='d-flex justify-content-center align-items-center min-vh-100 bg-primary'>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section> 
  )
}