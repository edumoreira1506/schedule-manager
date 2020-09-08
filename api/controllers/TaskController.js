import Controller from './Controller.js';
import { store, all } from '../models/Task.js';

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

    return await all(token, { keyWord, page, userId, finishedAt, startedAt }, Controller.authenticatedSearchCallback(res, 'tasks'), Controller.dependencies);
  }
}
