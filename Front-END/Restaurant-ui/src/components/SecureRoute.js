// SecureRoute.js

import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../actions/authActions';

const SecureRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = isLoggedIn();

  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  );
};

export default SecureRoute;
