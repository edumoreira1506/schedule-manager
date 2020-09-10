import React from 'react';
import { useTranslation } from 'react-i18next';
import UserForm from '../../../components/Forms/UserForm';
import useApi from '../../../hooks/useApi';
import { update } from '../../../models/user';
import useService from '../../../hooks/useService';
import useStore from '../../../hooks/useStore';

import './index.scss';

const EditPassword = () => {
  const [user] = useStore('user');
  const { t } = useTranslation(['links', 'common']);
  const userAPI = useApi('user');
  const customAlerts = useService('Alert');

  const handleUpdateUser = ({ password, confirmPassword }) => update(user.id, {
    password, confirmPassword,
  }, {
    onSuccess: () => customAlerts.success(t('common:edited')),
    onError: customAlerts.error,
  }, userAPI);

  return (
    <div className="EditPassword Flex Flex--vertical-alignment Flex--justify-center Flex--align-center">
      <p className="EditPassword__title">{t('links:editPassword')}</p>
      <div className="EditPassword__form">
        <UserForm
          hide={{ name: true, email: true, isAdmin: true }}
          onSubmit={handleUpdateUser}
        />
      </div>
    </div>
  );
};

export default EditPassword;
