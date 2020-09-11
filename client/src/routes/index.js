import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AdminListUsers from '../pages/admin/Users/List';
import AdminNewUser from '../pages/admin/Users/New';
import AdminUsersEdit from '../pages/admin/Users/Edit';
import AdminUsersEditPassword from '../pages/admin/Users/EditPassword';
import Login from '../pages/public/Login';
import AdminHome from '../pages/admin/Home';
import EditProfile from '../pages/private/EditProfile';
import EditPassword from '../pages/private/EditPassword';
import Tasks from '../pages/admin/Tasks/List';
import NewTask from '../pages/admin/Tasks/New';
import EditTask from '../pages/admin/Tasks/Edit';
import UserHome from '../pages/user/Home';
import { publicRoutes, adminRoutes, privateRoutes, userRoutes } from '../config/constants';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PublicRoute exact path={publicRoutes.LOGIN} component={Login} />

      <AdminRoute exact path={adminRoutes.HOME} component={AdminHome} />
      <AdminRoute exact path={adminRoutes.USERS} component={AdminListUsers} />
      <AdminRoute exact path={adminRoutes.NEW_USER} component={AdminNewUser} />
      <AdminRoute exact path={adminRoutes.EDIT_USER(':userId')} component={AdminUsersEdit} />
      <AdminRoute exact path={adminRoutes.EDIT_PASSWORD(':userId')} component={AdminUsersEditPassword} />
      <AdminRoute exact path={adminRoutes.TASKS} component={Tasks} />
      <AdminRoute exact path={adminRoutes.NEW_TASK} component={NewTask} />
      <AdminRoute exact path={adminRoutes.EDIT_TASK(':userId', ':taskId')} component={EditTask} />

      <PrivateRoute exact path={privateRoutes.EDIT_PROFILE} component={EditProfile} />
      <PrivateRoute exact path={privateRoutes.EDIT_PASSWORD} component={EditPassword} />

      <PrivateRoute exact path={userRoutes.HOME} component={UserHome} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
