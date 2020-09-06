import Sequelize from 'sequelize';
import databaseConfig from '../config/database.cjs';
import { User } from '../models/repositories/UserRepository.js';

const connection = new Sequelize(databaseConfig);

User.init(connection);

connection.sync()
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Connection to database failed', err));
