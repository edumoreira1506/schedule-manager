export const all = async (filters = {}, callback, taskService) => {
  const mappedFilters = {
    ...(filters.page ? { page: filters.page } : {}),
    ...(filters.keyWord ? { keyWord: filters.keyWord } : {}),
    ...(filters.userId ? { userId: filters.userId } : {}),
    ...(filters.startedAt ? { startedAt: filters.startedAt } : {}),
    ...(filters.finishedAt ? { finishedAt: filters.finishedAt } : {}),
  };
  const apiReponse = await taskService.all(mappedFilters);

  return apiReponse.ok ? callback.onSuccess(apiReponse.tasks, apiReponse.pages) : callback.onError(apiReponse.errors.join(' '));
};
