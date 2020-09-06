import route from './route.js';

export default ({
  title,
  category,
  needsToken = true,
  bodyParams = null,
  pathParams = [],
}) => route({
  pathParams,
  title,
  category,
  needsToken,
  bodyParams,
  route: 'delete'
});
