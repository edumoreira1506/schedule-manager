import TaskMapper from './mappers/TaskMapper.js';
import { show, authenticateAsAdmin } from './User.js';

export const taskTemplate = (task, user) => ({
  ...task,
  responsible: user.id
});

export const store = async (task, userId, token, callback, dependencies) => await show(token, userId, {
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

export const all = async (token, filters, callback, dependencies) => await authenticateAsAdmin(token, {
  ...callback,
  onAllowed: async () => {
    const { repositories: { TaskRepository } } = dependencies;
    const tasks = await TaskRepository.search(filters);
    const pages = await TaskRepository.countPages(filters);

    return callback.onFound(tasks, pages);
  }
}, dependencies);
