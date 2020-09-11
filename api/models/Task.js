import TaskMapper from './mappers/TaskMapper.js';
import { show as showUser, authenticateAsAdmin } from './User.js';
import UserMapper from './mappers/UserMapper.js';
import moment from 'moment';

export const taskTemplate = ({ startedAt, finishedAt, ...task }, user) => ({
  ...task,
  responsible: user.id,
  startedAt: moment(startedAt).isValid() ? moment(startedAt).format() : null,
  finishedAt: moment(finishedAt).isValid() ? moment(finishedAt).format() : null,
});

export const store = async (task, userId, token, callback, dependencies) => await showUser(token, userId, {
  ...callback,
  onFound: user => {
    const taskDTO = TaskMapper.toDTO(task);

    return taskDTO.validate({
      onValidated: async () => {
        const { repositories: { TaskRepository } } = dependencies;
        const task = await TaskRepository.save(taskTemplate(taskDTO, user));

        return callback.onSaved(task);
      },
      onInvalidated: callback.onError
    });
  },
}, dependencies);

const searchTasks = async (filters, dependencies, callback) => {
  const { repositories: { TaskRepository } } = dependencies;
  const tasks = await TaskRepository.search(filters);
  const pages = await TaskRepository.countPages(filters);

  return callback(tasks, pages);
};

export const all = async (token, filters, callback, dependencies) => await authenticateAsAdmin(token, {
  ...callback,
  onAllowed: async () => await searchTasks(filters, dependencies, callback.onFound),
}, dependencies);

export const index = async (token, userId, filters, callback, dependencies) => await showUser(token, userId, {
  ...callback,
  onFound: async () => await searchTasks(filters, dependencies, callback.onFound),
}, dependencies);

export const show = async (token, userId, taskId, callback, dependencies) => await showUser(token, userId, {
  ...callback,
  onFound: async user => {
    const userDTO = UserMapper.toDTO(user);
    const { repositories: { TaskRepository } } = dependencies;
    const task = await TaskRepository.findById(taskId);

    if (!task) return callback.onNotFound();
    if (task.responsible !== Number(userId) && !userDTO.isAdmin) return callback.onNotAllowed();

    return callback.onFound(task);
  }
}, dependencies);

export const update = async (newProps, token, userId, taskId, callback, dependencies) => await show(token, userId, taskId, {
  ...callback,
  onFound: async task => {
    const { repositories: { TaskRepository }, services: { Token } } = dependencies;
    const taskDTO = TaskMapper.toDTO(task);
    const userOfToken = Token.decrypt(token);

    taskDTO.addProps(newProps);

    return taskDTO.validate({
      onValidated: async () => await TaskRepository.updateById(taskId, taskTemplate(newProps, userOfToken), callback),
      onInvalidated: callback.onError
    });
  }
}, dependencies);

export const remove = async (token, userId, taskId, callback, dependencies) => await show(token, userId, taskId, {
  ...callback,
  onFound: async task => {
    const { repositories: { TaskRepository } } = dependencies;

    return await TaskRepository.deleteById(task.id, callback);
  }
}, dependencies);
