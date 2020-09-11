import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useApi from '../../../../hooks/useApi';
import useService from '../../../../hooks/useService';
import { index, remove } from '../../../../models/task';
import Task from '../../../../components/Task';
import Input from '../../../../components/Input';

import './index.scss';

const TasksPage = () => {
  const dateFilters = { FINISHED_AT: 'FINISHED_AT', STARTS_AT: 'STARTS_AT' };
  const taskAPI = useApi('task');
  const [tasks, setTasks] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);
  const [replaceTasks, setReplaceTasks] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [startAtFilter, setStartAtFilter] = useState('');
  const [finishedAtFilter, setFinishedAtFilter] = useState('');
  const customAlerts = useService('Alert');
  const LocalStorage = useService('LocalStorage');
  const { t } = useTranslation(['links', 'common', 'task', 'filters']);
  const userId = LocalStorage.getUser().id;

  const handleDelete = (task) => remove(task.user.id, task.id, {
    onSuccess: () => {
      customAlerts.success(t('common:deleted'));
      setTasks((prevTasks) => prevTasks.filter((item) => item.id !== task.id));
    },
    onError: customAlerts.error,
  }, taskAPI);

  const handleSearch = (newKeyWord) => {
    if (newKeyWord !== keyWord) {
      setKeyWord(newKeyWord);
      setReplaceTasks(true);
      setPage(0);
    }
  };

  const handleChangeDateFilter = (dateFilter, newFilterValue) => {
    if (dateFilter === dateFilters.FINISHED_AT) {
      setFinishedAtFilter(newFilterValue);
      setReplaceTasks(true);
      setPage(0);
    } else if (dateFilter === dateFilters.STARTS_AT) {
      setStartAtFilter(newFilterValue);
      setReplaceTasks(true);
      setPages(0);
    }
  };

  useEffect(() => {
    const fetchTasks = () => index(userId, {
      page,
      keyWord,
      startedAt: startAtFilter,
      finishedAt: finishedAtFilter,
    }, {
      onSuccess: (tasksFromAPI, pagesFromAPI) => {
        setPages(pagesFromAPI);

        if (replaceTasks) {
          setTasks(tasksFromAPI);
          setReplaceTasks(false);
        } else {
          setTasks((prevTasks) => [...tasksFromAPI, ...prevTasks]);
        }
      },
      onError: customAlerts.error,
    }, taskAPI);

    fetchTasks();
  }, [customAlerts, taskAPI, page, keyWord, startAtFilter, finishedAtFilter, userId]);

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
      <div className="TasksPage__filters Flex Flex--vertical-alignment Flex--align-center Flex--justify-between">
        <div className="TasksPage__input Flex">
          <div className="TasksPage__input-label">{t('filters:keyword')}</div>
          <div className="TasksPage__input-text">
            <Input type="search" placeholder={t('common:search')} value={keyWord} onChange={handleSearch} />
          </div>
        </div>
        <div className="TasksPage__input Flex">
          <div className="TasksPage__input-label">{t('filters:startsAt')}</div>
          <div className="TasksPage__input-text">
            <Input type="date" placeholder={t('task:startedAt')} value={startAtFilter} onChange={(value) => handleChangeDateFilter(dateFilters.STARTS_AT, value)} />
          </div>
        </div>
        <div className="TasksPage__input Flex">
          <div className="TasksPage__input-label">{t('filters:finishesAt')}</div>
          <div className="TasksPage__input-text">
            <Input type="date" placeholder={t('task:finishedAt')} value={finishedAtFilter} onChange={(value) => handleChangeDateFilter(dateFilters.FINISHED_AT, value)} />
          </div>
        </div>
      </div>
      <ul className="TasksPage__tasks">
        {tasks.map((task) => (
          <li className="TasksPage__task" key={task.id}>
            <Task
              user={task.user}
              description={task.description}
              createdAt={task.createdAt}
              finishedAt={task.finishedAt}
              startedAt={task.startedAt}
              onDelete={() => handleDelete(task)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
