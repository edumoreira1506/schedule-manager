import { statusCodes } from '../../config/constants.js';

export default ({
  title,
  category,
  needsToken = true,
  bodyParams = null,
  pathParams = [],
  queryParams = [],
  route,
}) => ({
  [route]: {
    summary: title,
    tags: [ category ],
    parameters: [
      (bodyParams ? {
        in: 'body',
        name: 'payload',
        schema: {
          type: 'object',
          properties: Object.fromEntries(
            bodyParams.map(param => [param.key, { type: param.type }])
          )
        }
      } : null),
      (needsToken ? {
        in: 'header',
        name: 'Authorization',
        schema: {
          type: 'string',
        },
      } : null),
      ...pathParams.map(pathParam =>  ({
        in: 'path',
        name: pathParam.name,
        description: pathParam.description,
        schema: {
          type: pathParam.type
        }
      })),
      ...queryParams.map(queryParam => ({
        in: 'query',
        name: queryParam.name,
        description: queryParam.description,
        schema: {
          type: queryParam.type,
        }
      }))
    ].filter(Boolean),
    responses: {
      [statusCodes.ERROR]: {
        description: 'Error'
      },
      [statusCodes.CREATED]: {
        description: 'Created',
      },
      [statusCodes.NOT_ALLOWED]: {
        description: 'Not allowed',
      },
      [statusCodes.OK]: {
        description: 'OK',
      },
      [statusCodes.NOT_FOUND]: {
        description: 'Not found',
      },
      [statusCodes.UPDATED]: {
        description: 'Updated',
      },
    }
  },
});
