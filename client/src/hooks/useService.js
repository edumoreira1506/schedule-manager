import services from '../services';

const useService = (service) => {
  const entityService = services[service];

  return entityService;
};

export default useService;
