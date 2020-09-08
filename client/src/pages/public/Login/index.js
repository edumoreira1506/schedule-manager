import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Form from '../../../components/Form';

import './index.scss';

const PublicLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation(['common', 'user']);

  const handeLogin = (e) => {
    e.preventDefault();
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
