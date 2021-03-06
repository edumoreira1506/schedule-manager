import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../services/LocalStorage';
import { isAuthenticated, getMainRoute } from '../models/user';

const PublicRoute = ({ component: Component, ...rest }) => {
  const user = getUser();
  const renderChildren = (props) => (!isAuthenticated()
    ? <Component {...props} />
    : <Redirect to={getMainRoute(user)} />
  );

  return (<Route {...rest} render={renderChildren} />);
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
