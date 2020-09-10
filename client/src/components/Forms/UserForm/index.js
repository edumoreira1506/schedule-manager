import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Form from '../../Form';

import './index.scss';

const UserForm = ({ onSubmit }) => {
  const { t } = useTranslation(['user', 'common']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleIsAdmin = () => setIsAdmin(!isAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSubmit({ name, email, password, confirmPassword, isAdmin });
  };

  const inputs = [
    {
      value: name,
      placeholder: t('user:name'),
      type: 'text',
      onChange: setName,
    },
    {
      value: email,
      placeholder: t('user:email'),
      type: 'email',
      onChange: setEmail,
    },
    {
      value: password,
      placeholder: t('user:password'),
      type: 'password',
      onChange: setPassword,
    },
    {
      value: confirmPassword,
      placeholder: t('user:confirmPassword'),
      type: 'password',
      onChange: setConfirmPassword,
    },
    {
      value: isAdmin,
      placeholder: t('user:isAdmin'),
      type: 'radio',
      onChange: toggleIsAdmin,
    },
  ];

  return (
    <Form inputs={inputs} buttonText={t('common:save')} onSubmit={handleSubmit} />
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;