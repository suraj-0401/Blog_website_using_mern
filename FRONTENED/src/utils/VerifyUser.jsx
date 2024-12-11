import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

 const VerifyUser  = ({ children }) => {
  const { isAuthenticated } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default VerifyUser ;