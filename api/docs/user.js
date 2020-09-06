import postRoute from './helpers/postRoute.js';
import getRoute from './helpers/getRoute.js';
import patchRoute from './helpers/patchRoute.js';
import deleteRoute from './helpers/deleteRoute.js';

export default {
  '/auth': {
    ...postRoute({
      title: 'Auth user',
      category: 'Auth',
      bodyParams: [
        {
          key: 'email',
          type: 'string'
        },
        {
          key: 'password',
          type: 'string'
        },
      ] 
    }),
  },
  '/user': {
    ...postRoute({
      title: 'Register user',
      category: 'User',
      bodyParams: [
        {
          key: 'name',
          type: 'string'
        },
        {
          key: 'email',
          type: 'string'
        },
        {
          key: 'password',
          type: 'string'
        },
        {
          key: 'confirmPassword',
          type: 'string',
        },
        {
          key: 'isAdmin',
          type: 'boolean',
        }
      ] 
    }),
    ...getRoute({
      title: 'List users',
      category: 'User',
    })
  },
  '/user/{userId}': {
    ...patchRoute({
      title: 'Update user',
      category: 'User',
      bodyParams: [
        {
          key: 'name',
          type: 'string'
        },
        {
          key: 'email',
          type: 'string'
        },
        {
          key: 'password',
          type: 'string'
        },
        {
          key: 'confirmPassword',
          type: 'string',
        },
        {
          key: 'isAdmin',
          type: 'boolean',
        }
      ],
      pathParams: [
        {
          name: 'userId',
          description: 'Id of user',
          type: 'integer'
        }
      ],
    }),
    ...deleteRoute({
      title: 'Delete user',
      category: 'User',
      pathParams: [
        {
          name: 'userId',
          description: 'Id of user',
          type: 'integer'
        }
      ],
    }),
    ...getRoute({
      title: 'Get an user',
      category: 'User',
      pathParams: [
        {
          name: 'userId',
          description: 'Id of user',
          type: 'integer'
        }
      ],
    })
  }
};
