import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';
import AdminListUsers from '../pages/admin/Users/List';
import Login from '../pages/public/Login';
import AdminHome from '../pages/admin/Home';
import { publicRoutes, adminRoutes } from '../config/constants';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PublicRoute exact path={publicRoutes.LOGIN} component={Login} />

      <AdminRoute exact path={adminRoutes.HOME} component={AdminHome} />
      <AdminRoute exact path={adminRoutes.USERS} component={AdminListUsers} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
