import Controller from './Controller.js';
import { store } from '../models/Task.js';

export default class TaskController extends Controller {
  static async store(req, res) {
    const task = Controller.getBody(req);
    const token = Controller.getToken(req);
    const userId = Controller.getParam(req, 'userId', 0);

    return await store(task, userId, token, Controller.authenticatedStoreCallback(res, 'task'), Controller.dependencies);
  }
}
