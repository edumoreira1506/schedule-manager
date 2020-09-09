import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/LocalStorage';

const INITIAL_STATE = {
  user: {},
};

export const AdminContext = createContext();

const AdminContainer = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const user = getUser();

    setState((prevState) => ({ ...prevState, user }));
  }, []);

  return (
    <AdminContext.Provider value={[state, setState]}>
      {children}
    </AdminContext.Provider>
  );
};

AdminContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContainer;
