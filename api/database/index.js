import Sequelize from 'sequelize';
import databaseConfig from '../config/database.cjs';
import { User } from '../models/repositories/UserRepository.js';
import { Task } from '../models/repositories/TaskRepository.js';

const connection = new Sequelize(databaseConfig);

User.init(connection);
Task.init(connection);

User.associate(connection.models);
Task.associate(connection.models);

connection.sync()
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Connection to database failed', err));
