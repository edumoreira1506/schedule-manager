import express from 'express';
import HomeController from '../controllers/HomeController.js';
import UserController from '../controllers/UserController.js';

const routes = express.Router();

routes.get('/', HomeController.index);

routes.post('/auth', UserController.login);

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.patch('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.remove);

export default routes;
