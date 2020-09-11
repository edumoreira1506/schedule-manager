import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useApi from '../../../hooks/useApi';
import useService from '../../../hooks/useService';
import { all } from '../../../models/task';
import Task from '../../../components/Task';
import { remove } from '../../../models/task';

import './index.scss';

const TasksPage = () => {
  const taskAPI = useApi('task');
  const [tasks, setTasks] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);
  const customAlerts = useService('Alert');
  const { t } = useTranslation(['links', 'common']);

  const handleDelete = (task) => remove(task.user.id, task.id, {
    onSuccess: () => {
      customAlerts.success(t('common:deleted'));
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    },
    onError: customAlerts.error,
  }, taskAPI);

  useEffect(() => {
    const fetchTasks = () => all({
      page,
    }, {
      onSuccess: (tasksFromAPI, pagesFromAPI) => {
        setTasks((prevTasks) => [...tasksFromAPI, ...prevTasks]);
        setPages(pagesFromAPI);
      },
      onError: customAlerts.error,
    }, taskAPI);

    fetchTasks();
  }, [customAlerts, taskAPI, page]);

  useEffect(() => {
    const handleScroll = () => {
      // eslint-disable-next-line max-len
      const isOnBottomLimitPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
      const hasMorePages = page < pages;

      if (isOnBottomLimitPage && hasMorePages) {
        setPage(page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, pages]);

  return (
    <div className="TasksPage Flex Flex--vertical-alignment Flex--justify-center Flex--align-center">
      <p className="TasksPage__title">{t('links:tasks')}</p>
      <ul className="TasksPage__tasks">
        {tasks.map((task) => (
          <li className="TasksPage__task" key={task.id}>
            <Task
              user={task.user}
              description={task.description}
              createdAt={task.createdAt}
              finishedAt={task.finishedAt}
              startedAt={task.startedAt}
              canDelete
              onDelete={() => handleDelete(task)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;