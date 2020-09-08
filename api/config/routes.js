import express from 'express';
import HomeController from '../controllers/HomeController.js';
import UserController from '../controllers/UserController.js';
import TaskController from '../controllers/TaskController.js';

const routes = express.Router();

routes.get('/', HomeController.index);

routes.post('/auth', UserController.login);

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.patch('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.remove);

routes.get('/task', TaskController.all);

routes.post('/user/:userId/task', TaskController.store);
routes.get('/user/:userId/task', TaskController.index);
routes.get('/user/:userId/task/:taskId', TaskController.show);
routes.patch('/user/:userId/task/:taskId', TaskController.update);

export default routes;
