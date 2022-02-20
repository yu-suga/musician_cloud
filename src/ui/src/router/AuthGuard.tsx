import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard: React.FC = ({ children }) => {
  // const user = useSelector(selectUser);
  // return user.id ? <>{children}</> : <Navigate to="/login" />;
  return null;
};

export default AuthGuard;
