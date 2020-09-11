import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TaskForm from '../../../../components/Forms/TaskForm';
import useApi from '../../../../hooks/useApi';
import useService from '../../../../hooks/useService';
import { show, update } from '../../../../models/task';

import './index.scss';

const EditTaskPage = () => {
  const { t } = useTranslation(['links']);
  const [task, setTask] = useState(null);
  const { userId, taskId } = useParams();
  const taskAPI = useApi('task');
  const customAlerts = useService('Alert');

  useEffect(() => {
    const fetchTask = async () => {
      show(userId, taskId, {
        onSuccess: (taskFromAPI) => setTask({
          ...taskFromAPI,
          responsibleId: taskFromAPI.user.id,
          responsible: taskFromAPI.user.name,
        }),
        onError: customAlerts.error,
      }, taskAPI);
    };

    fetchTask();
  }, [userId, taskId, taskAPI, customAlerts]);

  const handleEditTask = (newProps) => update(userId, taskId, newProps, {
    onSuccess: () => customAlerts.success(t('common:edited')),
    onError: customAlerts.error,
  }, taskAPI);

  return (
    <div className="EditTaskPage Flex Flex--vertical-alignment Flex--justify-center Flex--align-center">
      <p className="EditTaskPage__title">{t('links:editTask')}</p>
      <div className="EditTaskPage__form">
        {task && <TaskForm onSubmit={handleEditTask} task={task} />}
      </div>
    </div>
  );
};

export default EditTaskPage;
