import React from 'react';
import { useTranslation } from 'react-i18next';
import TaskForm from '../../../../components/Forms/TaskForm';
import { register } from '../../../../models/task';
import useService from '../../../../hooks/useService';
import useApi from '../../../../hooks/useApi';

import './index.scss';

const NewTaskPage = () => {
  const { t } = useTranslation(['links', 'common']);
  const taskAPI = useApi('task');
  const customAlerts = useService('Alert');

  const handleRegisterTask = ({ responsibleId, ...task }) => register(responsibleId, task, {
    onSuccess: () => customAlerts.success(t('common:saved')),
    onError: customAlerts.error,
  }, taskAPI);

  return (
    <div className="NewTaskPage Flex Flex--vertical-alignment Flex--justify-center Flex--align-center">
      <p className="NewTaskPage__title">{t('links:newTask')}</p>
      <div className="NewTaskPage__form">
        <TaskForm onSubmit={handleRegisterTask} />
      </div>
    </div>
  );
};

export default NewTaskPage;
