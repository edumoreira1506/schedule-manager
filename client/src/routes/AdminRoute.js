import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../services/LocalStorage';
import { isAuthenticated, getMainRoute } from '../models/user';
import withTemplate from '../wrappers/withTemplate';
import withUserContext from '../wrappers/withUserContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const user = getUser();
  const renderChildren = (props) => ((isAuthenticated() && user.isAdmin)
    ? withTemplate(<Component {...props} />)
    : <Redirect to={getMainRoute(user)} />
  );

  return (<Route {...rest} render={withUserContext(renderChildren)} />);
};

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AdminRoute;
