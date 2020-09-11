import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../Button';

import './index.scss';

const Task = ({
  description,
  createdAt,
  finishedAt,
  startedAt,
  user,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation(['task']);

  return (
    <div className="Task Flex Flex--align-center Flex--justify-center Flex--vertical-alignment">
      <p className="Task__description">{description}</p>
      <div className="Task__details Flex Flex--align-center Flex--justify-around">
        <span className="Task__time">{t('task:createdAt', { date: moment(createdAt).format('DD-MM-YYYY hh:mm:ss') })}</span>
        <span className="Task__time">{finishedAt && t('task:finishedAt', { date: moment(finishedAt).format('DD-MM-YYYY hh:mm:ss') })}</span>
        <span className="Task__time">{startedAt && t('task:startedAt', { date: moment(startedAt).format('DD-MM-YYYY hh:mm:ss') })}</span>
      </div>
      <p className="Task__user">{t('task:responsible', { name: user.name })}</p>
      <div className="Task__actions Flex Flex--align-center Flex--justify-around">
        <div className="Task__action">
          <Button onClick={onDelete}>
            <FaTrashAlt />
          </Button>
        </div>
        <div className="Task__action">
          <Button onClick={onEdit}>
            <FaEdit />
          </Button>
        </div>
      </div>
    </div>
  );
};

Task.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  finishedAt: PropTypes.string,
  startedAt: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Task.defaultProps = {
  finishedAt: '',
  startedAt: '',
};

export default Task;
