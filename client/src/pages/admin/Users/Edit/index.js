import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserForm from '../../../../components/Forms/UserForm';
import useApi from '../../../../hooks/useApi';
import { update } from '../../../../models/user';
import useService from '../../../../hooks/useService';
import { show } from '../../../../models/user';

import './index.scss';

const AdminUsersEdit = () => {
  const [user, setUser] = useState(null);
  const { t } = useTranslation(['links', 'common']);
  const { userId } = useParams();
  const userAPI = useApi('user');
  const customAlerts = useService('Alert');

  useEffect(() => {
    const fetchUser = async () => {
      show(userId, {
        onSuccess: setUser,
        onError: customAlerts.error,
      }, userAPI);
    };

    fetchUser();
  }, [userId]);

  const handleUpdateUser = ({ password, confirmPassword, ...user }) => update(userId, {
    ...user,
    ...(password ? ({ password, confirmPassword }) : {}),
  }, {
    onSuccess: () => window.alert(t('common:edited')),
    onError: customAlerts.error,
  }, userAPI);

  return (
    <div className="AdminUsersEdit Flex Flex--vertical-alignment Flex--justify-center Flex--align-center">
      <p className="AdminUsersEdit__title">{t('links:editUser')}</p>
      <div className="AdminUsersEdit__form">
        {user && (
          <UserForm
            user={user}
            hide={{ password: true, confirmPassword: true }}
            onSubmit={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsersEdit;
