import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Form from '../Form';

const UserForm = ({ onSubmit, user, hide }) => {
  const { t } = useTranslation(['user', 'common']);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(user.isAdmin || false);

  const toggleIsAdmin = () => setIsAdmin(!isAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSubmit({
      name,
      email,
      password,
      confirmPassword,
      isAdmin,
    });
  };

  const inputs = [
    {
      value: name,
      placeholder: t('user:name'),
      type: 'text',
      onChange: setName,
      hide: hide.name,
      selector: 'user-name',
    },
    {
      value: email,
      placeholder: t('user:email'),
      type: 'email',
      onChange: setEmail,
      hide: hide.email,
      selector: 'user-email',
    },
    {
      value: password,
      placeholder: t('user:password'),
      type: 'password',
      onChange: setPassword,
      hide: hide.password,
      selector: 'user-password',
    },
    {
      value: confirmPassword,
      placeholder: t('user:confirmPassword'),
      type: 'password',
      onChange: setConfirmPassword,
      hide: hide.confirmPassword,
      selector: 'user-confirm-password',
    },
    {
      value: isAdmin,
      placeholder: t('user:isAdmin'),
      type: 'radio',
      onChange: toggleIsAdmin,
      hide: hide.isAdmin,
    },
  ];

  return (
    <Form inputs={inputs} buttonText={t('common:save')} onSubmit={handleSubmit} buttonSelector="user-post-button" />
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    isAdmin: PropTypes.bool,
  }),
  hide: PropTypes.shape({
    name: PropTypes.bool,
    email: PropTypes.bool,
    password: PropTypes.bool,
    confirmPassword: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }),
};

UserForm.defaultProps = {
  user: {},
  hide: {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    isAdmin: false,
  },
};

export default UserForm;
