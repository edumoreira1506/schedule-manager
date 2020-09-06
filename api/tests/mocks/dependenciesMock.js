import services from '../../services/index.js';

export default ({ repositories, services: overrideServices } = {}) => ({
  repositories: {
    ...repositories
  },
  services: {
    ...services,
    ...overrideServices,
  }
})
