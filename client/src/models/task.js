export const remove = async (userId, taskId, callback, taskService) => {
  const apiReponse = await taskService.remove(userId, taskId);

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
