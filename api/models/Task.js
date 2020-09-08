import TaskMapper from './mappers/TaskMapper.js';
import { show } from './User.js';

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
