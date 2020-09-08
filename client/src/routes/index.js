import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import Login from '../pages/public/Login';
import { publicRoutes } from '../config/constants';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PublicRoute exact path={publicRoutes.LOGIN} component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
