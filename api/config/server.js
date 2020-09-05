import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes.js';
import swaggerDocument from '../docs/index.js';
import swaggerUi from 'swagger-ui-express';
import './i18n.js';

const App = express();

App.use(
  cors({ origin: '*' })
);
App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());
App.use(routes);
App.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

App.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

export default App;
