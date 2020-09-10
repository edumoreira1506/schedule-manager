import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../models/user';
import withTemplate from '../wrappers/withTemplate';
import { publicRoutes } from '../config/constants';
import withUserContext from '../wrappers/withUserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const renderChildren = (props) => ((isAuthenticated())
    // eslint-disable-next-line react/jsx-props-no-spreading
    ? withTemplate(<Component {...props} />)
    : <Redirect to={publicRoutes.LOGIN} />
  );

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (<Route {...rest} render={withUserContext(renderChildren)} />);
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
