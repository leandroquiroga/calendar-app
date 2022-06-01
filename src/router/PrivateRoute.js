import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

export const PrivateRoute = ({ children }) => {
  
  const { uid } = useSelector(state => state.auth);
  
  return (!!uid)
    ? children
    : <Navigate to='/login' />
};