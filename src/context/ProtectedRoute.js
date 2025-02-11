// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading"><p>Loading...</p></div>;
  }

  if (!user || !user.id) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
