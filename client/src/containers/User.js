import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/LocalStorage';

const INITIAL_STATE = {
  user: {},
};

export const UserContext = createContext();

const UserContainer = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const user = getUser();

    setState((prevState) => ({ ...prevState, user }));
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

UserContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContainer;
