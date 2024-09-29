import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoggedInRoute = ({ component: Component, ...rest }) => {
  const user = sessionStorage.getItem('user');
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user ? <Redirect to="/account" /> : <Component {...routeProps} />
      }
    />
  );
};

export default LoggedInRoute;
