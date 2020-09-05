import Sequelize from 'sequelize';
import databaseConfig from '../config/database.cjs';

const connection = new Sequelize(databaseConfig);

connection.sync()
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Connection to database failed', err));
