import Controller from './Controller.js';
import i18next from 'i18next';
import { login, store, index, show, update, remove } from '../models/User.js';
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

  static async show(req, res) {
    const userId = Controller.getParam(req, 'id', 0);
    const token = Controller.getToken(req);

    return await show(token, userId, Controller.authenticatedFindCallback(res, 'user'), Controller.dependencies);
  }

  static async store(req, res) {
    const user = Controller.getBody(req);
    const token = Controller.getToken(req);

    return await store(user, token, Controller.authenticatedStoreCallback(res, 'user'), Controller.dependencies);
  }

  static async update(req, res) {
    const newProps = Controller.getBody(req);
    const token = Controller.getToken(req);
    const userId = Controller.getParam(req, 'id', 0);

    return await update(token, newProps, userId, Controller.authenticatedUpdateCallback(res), Controller.dependencies);
  }

  static async index(req, res) {
    const token = Controller.getToken(req);
    const keyWord = Controller.getQueryParam(req, 'keyword', '');
    const page = Controller.getQueryParam(req, 'page', 0);

    return await index(token, keyWord, page, Controller.authenticatedSearchCallback(res, 'users'), Controller.dependencies);
  }

  static async remove(req, res) {
    const token = Controller.getToken(req);
    const userId = Controller.getParam(req, 'id', 0);

    return await remove(token, userId, Controller.authenticatedRemoveCallback(res), Controller.dependencies);
  }
}
