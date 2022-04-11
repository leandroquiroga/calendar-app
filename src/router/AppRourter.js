import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CalendarApp } from '../CalendarApp';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { PageNotFound } from '../components/pageNotFound/PageNotFound';

export const AppRourter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <Login />}/>
        <Route path='/register' element={ <Register />} />
        <Route path='/' element={ <CalendarApp />}/>
        <Route path='*' element={ <PageNotFound/> } />
      </Routes>
    </BrowserRouter>
  )
}
