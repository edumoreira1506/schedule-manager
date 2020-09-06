import Controller from './Controller.js';
import i18next from 'i18next';

export default class HomeController extends Controller {
  static async index(_, res) {
    return res.send(i18next.t('onlineApi'));
  }
}
