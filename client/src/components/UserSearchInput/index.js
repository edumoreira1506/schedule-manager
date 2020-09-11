/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import useApi from '../../hooks/useApi';
import useService from '../../hooks/useService';
import { index } from '../../models/user';

import './index.scss';

const UserSearchInput = ({ onSelect, initialUser }) => {
  const [showUserAutoComplete, setShowUserAutoComplete] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [users, setUsers] = useState([]);
  const userAPI = useApi('user');
  const customAlerts = useService('Alert');
  const { t } = useTranslation(['common']);

  useEffect(() => {
    const fetchUsers = async () => {
      index(user, 0, {
        onSuccess: (usersApi) => setUsers(usersApi),
        onError: customAlerts.error,
      }, userAPI);
    };

    fetchUsers();
  }, [user, customAlerts, userAPI]);

  const handleToggleAutoComplete = () => setTimeout(() => {
    setShowUserAutoComplete(!showUserAutoComplete);
  }, 100);

  const handleSelectUser = (user) => {
    setUser(user.name);
    onSelect(user);
  };

  return (
    <div className="UserSearchInput">
      <Input type="text" onFocus={handleToggleAutoComplete} onBlur={handleToggleAutoComplete} placeholder={t('common:search')} value={user} onChange={setUser} />
      {showUserAutoComplete && (
        <div className="UserSearchInput__autocomplete Flex Flex--justify-start Flex--align-center Flex--vertical-alignment">
          {users.map((item) => (
            <div onClick={() => handleSelectUser(item)} className="UserSearchInput__autocomplete-option" key={item.email}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

UserSearchInput.propTypes = {
  onSelect: PropTypes.func.isRequired,
  initialUser: PropTypes.string,
};

UserSearchInput.defaultProps = {
  initialUser: '',
};

export default UserSearchInput;
