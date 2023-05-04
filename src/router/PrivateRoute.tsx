import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const PrivateRoute = ({ children }: any) => {
  const { uid } = useSelector((state: RootState) => state.auth);
  return !!uid ? children : <Navigate to="/login" />;
};
