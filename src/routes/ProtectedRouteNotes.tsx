import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks';

const ProtectedRouteNotes : React.FC = () => {  
  const currentUser = useAppSelector(state => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteNotes;