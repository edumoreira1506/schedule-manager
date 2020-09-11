import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import Form from '../Form';
import UserSearchInput from '../UserSearchInput';

const TaskForm = ({ onSubmit, task, hide }) => {
  const { t } = useTranslation(['task', 'common']);
  const [description, setDescription] = useState(task.description || '');
  const [responsibleId, setResponsibleId] = useState(task.responsibleId || '');
  const [startedAt, setStartedAt] = useState(moment(task.startedAt).format('YYYY-MM-DD') || '');
  const [finishedAt, setFinishedAt] = useState(moment(task.finishedAt).format('YYYY-MM-DD') || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSubmit({
      description,
      responsibleId,
      startedAt,
      finishedAt,
    });
  };

  const inputs = [
    {
      value: description,
      placeholder: t('task:description'),
      type: 'text',
      onChange: setDescription,
      hide: hide.description,
    },
    {
      value: startedAt,
      placeholder: t('task:startedAt'),
      type: 'date',
      onChange: setStartedAt,
      hide: hide.startedAt,
    },
    {
      value: finishedAt,
      placeholder: t('task:finishedAt'),
      type: 'date',
      onChange: setFinishedAt,
      hide: hide.finishedAt,
    },
  ];

  const handleSelectUser = (user) => {
    setResponsibleId(user.id);
  };

  const customFields = hide.responsible ? [] : [
    <UserSearchInput initialUser={task.responsible} onSelect={handleSelectUser} />,
  ];

  return (
    <Form customFields={customFields} inputs={inputs} buttonText={t('common:save')} onSubmit={handleSubmit} />
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.shape({
    description: PropTypes.string,
    startedAt: PropTypes.string,
    finishedAt: PropTypes.string,
    responsible: PropTypes.string,
    responsibleId: PropTypes.number,
  }),
  hide: PropTypes.shape({
    description: PropTypes.bool,
    startedAt: PropTypes.bool,
    finishedAt: PropTypes.bool,
    responsible: PropTypes.bool,
  }),
};

TaskForm.defaultProps = {
  task: {},
  hide: {
    description: false,
    startedAt: false,
    finishedAt: false,
    responsible: false,
  },
};

export default TaskForm;
