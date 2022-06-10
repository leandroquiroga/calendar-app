import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarApp } from '../CalendarApp';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { PageNotFound } from '../components/pageNotFound/PageNotFound';
import { startCheking } from '../actions/auth';
import { Loading } from '../components/ui/Loading';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRourter = () => {

  const dispatch = useDispatch();
  const { checking } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path='/' element={
          <PrivateRoute>
            <CalendarApp />
          </PrivateRoute>
        } />
        <Route path='*' element={
          <PageNotFound />
        } />
      </Routes>
    </BrowserRouter>
  )
};