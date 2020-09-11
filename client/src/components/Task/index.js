import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import './index.scss';

const Task = ({
  description,
  createdAt,
  finishedAt,
  startedAt,
  user,
}) => {
  const { t } = useTranslation(['task']);

  return (
    <div className="Task">
      <p className="Task__description">{description}</p>
      <div className="Task__details Flex Flex--align-center Flex--justify-around">
        <span className="Task__time">{t('task:createdAt', { date: moment(createdAt).format('DD-MM-YYYY hh:mm:ss') })}</span>
        <span className="Task__time">{finishedAt && t('task:finishedAt', { date: moment(finishedAt).format('DD-MM-YYYY hh:mm:ss') })}</span>
        <span className="Task__time">{startedAt && t('task:startedAt', { date: moment(startedAt).format('DD-MM-YYYY hh:mm:ss') })}</span>
      </div>
      <p className="Task__user">{t('task:responsible', { name: user.name })}</p>
    </div>
  );
};

Task.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  finishedAt: PropTypes.string.isRequired,
  startedAt: PropTypes.string.isRequired,
};

export default Task;