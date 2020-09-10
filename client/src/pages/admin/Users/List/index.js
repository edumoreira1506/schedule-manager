import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useApi from '../../../../hooks/useApi';
import useService from '../../../../hooks/useService';
import { index, remove } from '../../../../models/user';
import Input from '../../../../components/Input';
import { adminRoutes } from '../../../../config/constants';
import Button from '../../../../components/Button';

import './index.scss';

const AdminUsersList = () => {
  const [keyWord, setKeyWord] = useState('');
  const [page, setPage] = useState(0);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [users, setUsers] = useState([]);
  const { t } = useTranslation(['user', 'common', 'users']);
  const userAPI = useApi('user');
  const customAlerts = useService('Alert');
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      index(keyWord, page, {
        onSuccess: (usersApi, pages) => {
          setUsers(usersApi);
          setAmountOfPages(pages - 1);
        },
        onError: customAlerts.error,
      }, userAPI);
    };

    fetchUsers();
  }, [keyWord, page, userAPI, customAlerts.error]);

  const handleRemoveUser = (user) => {
    const confirmDelete = window.confirm(t('common:confirmDelete'));

    if (confirmDelete) {
      remove(user.id, {
        onSuccess: () => {
          setUsers((oldUsers) => oldUsers.filter(u => u.id !== user.id));
          window.alert(t('common:deleted'));
        },
        onError: customAlerts.error,
      }, userAPI);
    }
  };

  const handleNavigateToEditPage = (user) => history.push(adminRoutes.EDIT_USER(user.id));
  const handleNavigateToEditPasswordPage = user => history.push(adminRoutes.EDIT_PASSWORD(user.id));

  return (
    <div className="AdminUsersList Flex Flex--justify-center Flex--align-center Flex--vertical-alignment">
      <p className="AdminUsersList__title">{t('users:other')}</p>
      <div className="AdminUsersList__search">
        <Input type="search" value={keyWord} onChange={setKeyWord} placeholder="Buscar..." />
      </div>
      <table className="AdminUsersList__table">
        <thead className="AdminUsersList__table-header">
          <tr className="AdminUsersList__table-line">
            <th scope="col">#</th>
            <th scope="col">{t('user:email')}</th>
            <th scope="col">{t('user:isAdmin')}</th>
            <th scope="col">{t('user:name')}</th>
            <th scope="col">{t('common:actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.email}</td>
              <td>{user.isAdmin ? t('common:yes') : t('common:no')}</td>
              <td>{user.name}</td>
              <td>
                <Button onClick={() => handleRemoveUser(user)} type="button">{t('common:delete')}</Button>
                <Button onClick={() => handleNavigateToEditPage(user)} type="button">{t('common:edit')}</Button>
                <Button onClick={() => handleNavigateToEditPasswordPage(user)} type="button">{t('common:editPassword')}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="AdminUsersList__dower Flex Flex--justify-between">
        <div className="AdminUsersList__arrow">
          <Button onClick={() => setPage(page - 1)} disabled={page === 0} type="button">
            {'<'}
          </Button>
        </div>
        <div className="AdminUsersList__arrow">
          <Button onClick={() => setPage(page + 1)} disabled={page === amountOfPages} type="button">
            {'>'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersList;
