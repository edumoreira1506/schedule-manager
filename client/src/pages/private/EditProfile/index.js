import React from 'react';
import { useTranslation } from 'react-i18next';
import UserForm from '../../../components/Forms/UserForm';
import useApi from '../../../hooks/useApi';
import { update } from '../../../models/user';
import useService from '../../../hooks/useService';
import useStore from '../../../hooks/useStore';

import './index.scss';

const EditProfile = () => {
  const [user, setUser] = useStore('user');
  const { t } = useTranslation(['links', 'common']);
  const userAPI = useApi('user');
  const customAlerts = useService('Alert');

  const handleUpdateUser = ({ email, name }) => update(user.id, {
    email, name,
  }, {
    onSuccess: () => {
      customAlerts.success(t('common:edited'));
      setUser({
        ...user,
        email,
        name,
      });
    },
    onError: customAlerts.error,
  }, userAPI);

  return (
    <div className="EditProfile Flex Flex--vertical-alignment Flex--justify-center Flex--align-center">
      <p className="EditProfile__title">{t('links:editProfile')}</p>
      <div className="EditProfile__form">
        {Object.values(user).length > 0 && (
          <UserForm
            user={user}
            hide={{ password: true, confirmPassword: true, isAdmin: true }}
            onSubmit={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
};

export default EditProfile;
