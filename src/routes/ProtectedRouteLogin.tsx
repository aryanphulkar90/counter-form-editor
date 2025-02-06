import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks';

const ProtectedRouteLogin: React.FC = () => {
  const currentUser = useAppSelector(state => state.user.currentUser);

  if (currentUser) {
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteLogin;