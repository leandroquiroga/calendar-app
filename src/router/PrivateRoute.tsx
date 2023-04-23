import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }: any) => {
  
  const { uid } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  return !!uid ? children : navigate("/login");
};