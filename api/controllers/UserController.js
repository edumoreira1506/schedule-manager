import Controller from './Controller.js';
import { store } from '../models/User.js';

export default class UserController extends Controller {
  static async store(req, res) {
    const user = Controller.getBody(req);
    const token = Controller.getToken(req);

    return await store(user, token, Controller.authenticatedStoreCallback(res, 'user'), Controller.dependencies);
  }
}
