import route from './route.js';

export default ({
  title,
  category,
  needsToken = true,
  bodyParams = null,
  pathParams = [],
  queryParams = [],
}) => route({
  title,
  category,
  needsToken,
  bodyParams,
  pathParams,
  route: 'get',
  queryParams
});
