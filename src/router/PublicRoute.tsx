import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }: any) => {
  const { uid } = useSelector((state: any) => state.auth);

  return !uid ? children : <Navigate to="/" />;
};