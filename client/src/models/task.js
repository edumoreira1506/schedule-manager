export const remove = async (userId, taskId, callback, taskService) => {
  const apiReponse = await taskService.remove(userId, taskId);

  return apiReponse.ok ? callback.onSuccess() : callback.onError(apiReponse.errors.join(' '));
};

export const index = async (userId, filters, callback, taskService) => {
  const mappedFilters = {
    ...(filters.page ? { page: filters.page } : {}),
    ...(filters.keyWord ? { keyword: filters.keyWord } : {}),
    ...(filters.startedAt ? { startedAt: filters.startedAt } : {}),
    ...(filters.finishedAt ? { finishedAt: filters.finishedAt } : {}),
  };
  const apiReponse = await taskService.index(userId, mappedFilters);

  return apiReponse.ok ? callback.onSuccess(apiReponse.tasks, apiReponse.pages) : callback.onError(apiReponse.errors.join(' '));
};

export const show = async (userId, taskId, callback, taskService) => {
  const apiReponse = await taskService.show(userId, taskId);

  return apiReponse.ok ? callback.onSuccess(apiReponse.task) : callback.onError(apiReponse.errors.join(' '));
};

export const update = async (userId, taskId, newProps, callback, taskService) => {
  const apiReponse = await taskService.update(userId, taskId, newProps);

  return apiReponse.ok ? callback.onSuccess() : callback.onError(apiReponse.errors.join(' '));
};

export const register = async (userId, task, callback, taskService) => {
  const apiReponse = await taskService.register(userId, task);

  return apiReponse.ok ? callback.onSuccess() : callback.onError(apiReponse.errors.join(' '));
};

export const all = async (filters = {}, callback, taskService) => {
  const mappedFilters = {
    ...(filters.page ? { page: filters.page } : {}),
    ...(filters.keyWord ? { keyword: filters.keyWord } : {}),
    ...(filters.userId ? { userId: filters.userId } : {}),
    ...(filters.startedAt ? { startedAt: filters.startedAt } : {}),
    ...(filters.finishedAt ? { finishedAt: filters.finishedAt } : {}),
  };
  const apiReponse = await taskService.all(mappedFilters);

  return apiReponse.ok ? callback.onSuccess(apiReponse.tasks, apiReponse.pages) : callback.onError(apiReponse.errors.join(' '));
};
