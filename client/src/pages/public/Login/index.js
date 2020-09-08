import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Form from '../../../components/Form';
import { login } from '../../../models/user';
import useApi from '../../../hooks/useApi';
import useService from '../../../hooks/useService';

import './index.scss';

const PublicLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userAPI = useApi('user');
  const customAlerts = useService('Alert');
  const localStorage = useService('LocalStorage');
  const history = useHistory();
  const { t } = useTranslation(['common', 'user']);

  const handeLogin = (e) => {
    e.preventDefault();

    return login(email, password, {
      onSuccess: (token, user) => {
        localStorage.setToken(token);
        localStorage.setUser(user);
        history.push('/');
      },
      onError: customAlerts.error,
    }, userAPI);
  };

  return (
    <div className="Flex Flex--align-center Flex--justify-center LoginPage">
      <div className="LoginPage__form Flex Flex--align-center Flex--justify-center">
        <Form
          onSubmit={handeLogin}
          inputs={[
            {
              value: email,
              onChange: setEmail,
              placeholder: t('user:email'),
              type: 'email',
            },
            {
              value: password,
              onChange: setPassword,
              placeholder: t('user:password'),
              type: 'password',
            },
          ]}
          buttonText={t('common:login')}
        />
      </div>
    </div>
  );
};

export default PublicLoginPage;
