import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminHomePage = () => {
  const { t } = useTranslation(['common']);

  return (
    <h1>{t('common:welcome')}</h1>
  );
};

export default AdminHomePage;
