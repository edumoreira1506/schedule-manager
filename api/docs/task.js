import postRoute from './helpers/postRoute.js';
import getRoute from './helpers/getRoute.js';
import patchRoute from './helpers/patchRoute.js';
import deleteRoute from './helpers/deleteRoute.js';

export default {
  '/task': {
    ...getRoute({
      title: 'List all tasks',
      category: 'Task',
      queryParams: [
        {
          name: 'page',
          description: 'Page of query (default is 0)',
          type: 'integer'
        },
        {
          name: 'keyword',
          description: 'Key word of query (default is an empty string)',
          type: 'string'
        },
        {
          name: 'userId',
          type: 'integer'
        },
        {
          name: 'startedAt',
          type: 'string'
        },
        {
          name: 'finishedAt',
          type: 'string'
        },
      ]
    }),
  },
  '/user/{userId}/task': {
    ...postRoute({
      title: 'Register task',
      category: 'Task',
      bodyParams: [
        {
          key: 'description',
          type: 'string'
        },
        {
          key: 'startedAt',
          type: 'string',
        },
        {
          key: 'finishedAt',
          type: 'string',
        },
      ],
      pathParams: [
        {
          name: 'userId',
          description: 'Id of user',
          type: 'integer'
        }
      ],
    }),
    ...getRoute({
      title: 'List tasks from user',
      category: 'Task',
      queryParams: [
        {
          name: 'page',
          description: 'Page of query (default is 0)',
          type: 'integer'
        },
        {
          name: 'keyword',
          description: 'Key word of query (default is an empty string)',
          type: 'string'
        },
        {
          name: 'startedAt',
          type: 'string'
        },
        {
          name: 'finishedAt',
          type: 'string'
        },
      ],
      pathParams: [
        {
          name: 'userId',
          description: 'Id of user',
          type: 'integer'
        }
      ],
    })
  },
  '/user/{userId}/task/{taskId}': {
    ...getRoute({
      title: 'Find task',
      category: 'Task',
      pathParams: [
        {
          name: 'userId',
          description: 'Id of user',
          type: 'integer'
        },
        {
          name: 'taskId',
          description: 'Id of task',
          type: 'integer',
        },
      ],
    }),
    ...patchRoute({
      title: 'Update task',
      category: 'Task',
      bodyParams: [
        {
          key: 'description',
          type: 'string'
        },
        {
          key: 'startedAt',
          type: 'string',
        },
        {
          key: 'finishedAt',
          type: 'string',
        },
      ],
      pathParams: [
        {
          name: 'userId',
          description: 'Id of user',
          type: 'integer'
        },
        {
          name: 'taskId',
          description: 'Id of task',
          type: 'integer'
        },
      ],
    }),
    ...deleteRoute({
      title: 'Delete task',
      category: 'Task',
      pathParams: [
        {
          name: 'userId',
          description: 'Id of user',
          type: 'integer'
        },
        {
          name: 'taskId',
          description: 'Id of task',
          type: 'integer'
        },
      ],
    }),
  }
};
