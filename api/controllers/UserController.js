import Controller from './Controller.js';
import i18next from 'i18next';
import { login, store, index } from '../models/User.js';
import { statusCodes } from '../config/constants.js';

export default class UserController extends Controller {
  static async login(req, res) {
    const { email, password } = Controller.getBody(req);

    return await login(email, password, {
      onAllowed: (user, token) => res.status(statusCodes.OK).send({ 
        ok: true,
        user,
        token,
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('invalidAuth')
        ]
      }),
    }, Controller.dependencies);
  }

  static async store(req, res) {
    const user = Controller.getBody(req);
    const token = Controller.getToken(req);

    return await store(user, token, Controller.authenticatedStoreCallback(res, 'user'), Controller.dependencies);
  }

  static async index(req, res) {
    const token = Controller.getToken(req);
    const keyWord = Controller.getBodyParam(req, 'keyword', '');
    const page = Controller.getBodyParam(req, 'page', 0);

    return await index(token, keyWord, page, Controller.authenticatedSearchCallback(res, 'users'), Controller.dependencies);
  }
}
