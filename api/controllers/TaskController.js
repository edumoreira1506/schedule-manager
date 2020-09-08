import Controller from './Controller.js';
import { store, all, index, show, update, remove } from '../models/Task.js';

export default class TaskController extends Controller {
  static async store(req, res) {
    const task = Controller.getBody(req);
    const token = Controller.getToken(req);
    const userId = Controller.getParam(req, 'userId', 0);

    return await store(task, userId, token, Controller.authenticatedStoreCallback(res, 'task'), Controller.dependencies);
  }

  static async all(req, res) {
    const token = Controller.getToken(req);
    const keyWord = Controller.getQueryParam(req, 'keyword', '');
    const page = Controller.getQueryParam(req, 'page', 0);
    const userId = Controller.getQueryParam(req, 'userId', null);
    const startedAt = Controller.getQueryParam(req, 'startedAt');
    const finishedAt = Controller.getQueryParam(req, 'finishedAt');
    const filters = { keyWord, page, userId, finishedAt, startedAt };

    return await all(token, filters, Controller.authenticatedSearchCallback(res, 'tasks'), Controller.dependencies);
  }

  static async index(req, res) {
    const token = Controller.getToken(req);
    const keyWord = Controller.getQueryParam(req, 'keyword', '');
    const page = Controller.getQueryParam(req, 'page', 0);
    const userId = Controller.getParam(req, 'userId', null);
    const startedAt = Controller.getQueryParam(req, 'startedAt');
    const finishedAt = Controller.getQueryParam(req, 'finishedAt');
    const filters = { keyWord, page, userId, finishedAt, startedAt };

    return await index(token, userId, filters, Controller.authenticatedSearchCallback(res, 'tasks'), Controller.dependencies);
  }

  static async show(req, res) {
    const token = Controller.getToken(req);
    const userId = Controller.getParam(req, 'userId', null);
    const taskId = Controller.getParam(req, 'taskId', null);

    return await show(token, userId, taskId, Controller.authenticatedFindCallback(res, 'task'), Controller.dependencies);
  }

  static async update(req, res) {
    const token = Controller.getToken(req);
    const userId = Controller.getParam(req, 'userId', null);
    const taskId = Controller.getParam(req, 'taskId', null);
    const newProps = Controller.getBody(req);

    return await update(newProps, token, userId, taskId, Controller.authenticatedUpdateCallback(res), Controller.dependencies);
  }

  static async remove(req, res) {
    const token = Controller.getToken(req);
    const userId = Controller.getParam(req, 'userId', null);
    const taskId = Controller.getParam(req, 'taskId', null);

    return await remove(token, userId, taskId, Controller.authenticatedRemoveCallback(res), Controller.dependencies);
  }
}
