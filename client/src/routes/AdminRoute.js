import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../services/LocalStorage';
import { isAuthenticated, getMainRoute } from '../models/user';
import withTemplate from '../wrappers/withTemplate';
import withAdminContext from '../wrappers/withAdminContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const user = getUser();
  const renderChildren = (props) => ((isAuthenticated() && user.isAdmin)
    // eslint-disable-next-line react/jsx-props-no-spreading
    ? withTemplate(<Component {...props} />)
    : <Redirect to={getMainRoute(user)} />
  );

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (<Route {...rest} render={withAdminContext(renderChildren)} />);
};

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AdminRoute;
