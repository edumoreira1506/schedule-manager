import useService from './useService';

const useApi = (entity) => {
  const apiService = useService('Api');
  const entityService = apiService.default[entity];

  return entityService;
};

export default useApi;
