import React from 'react';
import UserContainer from '../containers/User';

const withUserContext = (Component) => () => (
  <UserContainer>
    <Component />
  </UserContainer>
);

export default withUserContext;
