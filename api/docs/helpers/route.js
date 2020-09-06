export default ({
  title,
  category,
  needsToken = true,
  bodyParams = null,
  pathParams = [],
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
    ].filter(Boolean),
  },
});
