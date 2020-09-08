import user from './user.js';
import task from './task.js';

export default {
  swagger: '2.0',
  title : 'Schedule API - Documentation',
  description : 'Schedule Manager',
  version: '1.0.0',
  host: process.env.API_HOST,
  basePath: '/',
  schemes: [ 'http', 'https' ],
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  paths: {
    ...user,
    ...task,
  },
};
