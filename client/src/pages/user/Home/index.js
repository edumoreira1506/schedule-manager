import React from 'react';
import { useTranslation } from 'react-i18next';

const UserHomePage = () => {
  const { t } = useTranslation(['common']);

  return (
    <h1>{t('common:welcome')}</h1>
  );
};

export default UserHomePage;
