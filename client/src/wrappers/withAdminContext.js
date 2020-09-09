import React from 'react';
import AdminContainer from '../containers/Admin';

const withAdminContext = (Component) => () => (
  <AdminContainer>
    <Component />
  </AdminContainer>
);

export default withAdminContext;
