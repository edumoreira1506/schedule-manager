import React from 'react';
import { useTranslation } from 'react-i18next';
import UserForm from '../../../../components/Forms/UserForm';
import useApi from '../../../../hooks/useApi';
import { register } from '../../../../models/user';
import useService from '../../../../hooks/useService';

import './index.scss';

const AdminUsersNew = () => {
  const { t } = useTranslation(['links', 'common']);
  const userAPI = useApi('user');
  const customAlerts = useService('Alert');

  const handleRegisterUser = (user) => register(user, {
    onSuccess: () => window.alert(t('common:saved')),
    onError: customAlerts.error,
  }, userAPI);

  return (
    <div className="AdminUsersNew Flex Flex--vertical-alignment Flex--justify-center Flex--align-center">
      <p className="AdminUsersNew__title">{t('links:newUser')}</p>
      <div className="AdminUsersNew__form">
        <UserForm onSubmit={handleRegisterUser} />
      </div>
    </div>
  );
};

export default AdminUsersNew;
