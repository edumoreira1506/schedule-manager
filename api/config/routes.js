import express from 'express';
import HomeController from '../controllers/HomeController.js';
import UserController from '../controllers/UserController.js';

const routes = express.Router();

routes.get('/', HomeController.index);

routes.post('/auth', UserController.login);

routes.post('/user', UserController.store);

export default routes;
