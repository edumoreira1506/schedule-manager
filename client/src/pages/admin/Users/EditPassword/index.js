import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserForm from '../../../../components/Forms/UserForm';
import useApi from '../../../../hooks/useApi';
import { update } from '../../../../models/user';
import useService from '../../../../hooks/useService';

import './index.scss';

const AdminUsersEditPassword = () => {
  const { t } = useTranslation(['links', 'common']);
  const { userId } = useParams();
  const userAPI = useApi('user');
  const customAlerts = useService('Alert');

  const handleUpdateUser = ({ password, confirmPassword }) => update(userId,
    { password, confirmPassword },
    {
      onSuccess: () => window.alert(t('common:edited')),
      onError: customAlerts.error,
    },
    userAPI,
  );

  return (
    <div className="AdminUsersEditPassword Flex Flex--vertical-alignment Flex--justify-center Flex--align-center">
      <p className="AdminUsersEditPassword__title">{t('links:editUserPassword')}</p>
      <div className="AdminUsersEditPassword__form">
        <UserForm
          hide={{ name: true, email: true, isAdmin: true }}
          onSubmit={handleUpdateUser}
        />
      </div>
    </div>
  );
};

export default AdminUsersEditPassword;
