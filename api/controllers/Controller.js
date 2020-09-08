import { statusCodes } from '../config/constants.js';
import repositories from '../models/repositories/index.js';
import services from '../services/index.js';
import i18next from 'i18next';

export default class Controller {
  // eslint-disable-next-line
  static dependencies = {
    repositories,
    services,
  };

  static getToken(req) {
    const token = req?.header('Authorization') ?? '';

    return token;
  }

  static getBody(req, defaultValue = {}) {
    const body = req?.body ?? defaultValue;

    return body;
  }

  static getBodyParam(req, param, defaultValue = {}) {
    const bodyParam = req?.body?.[param] ?? defaultValue;

    return bodyParam;
  }

  static getQueryParam(req, param, defaultValue = {}) {
    const queryParam = req?.query?.[param] ?? defaultValue;

    return queryParam;
  }

  static getParam(req, param, defaultValue = {}) {
    const bodyParam = req?.params?.[param] ?? defaultValue;

    return bodyParam;
  }

  static authenticatedUpdateCallback(res) {
    return {
      onError: errors => res.status(statusCodes.ERROR).send({
        ok: false,
        errors,
      }),
      onUpdated: () => res.status(statusCodes.UPDATED).send({
        ok: true,
        errors: [
          i18next.t('successfullyUpdated')
        ]
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        errors: [
          i18next.t('notFound'),
        ],
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('notAllowed')
        ],
      })
    };
  }

  static authenticatedRemoveCallback(res) {
    return {
      onError: errors => res.status(statusCodes.ERROR).send({
        ok: false,
        errors,
      }),
      onDeleted: () => res.status(statusCodes.OK).send({
        ok: true,
        errors: [
          i18next.t('successfullyRemoved'),
        ],
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        errors: [
          i18next.t('notFound'),
        ],
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('notAllowed')
        ],
      })
    };
  }

  static authenticatedStoreCallback(res, key) {
    return {
      onError: errors => res.status(statusCodes.ERROR).send({
        ok: false,
        errors
      }),
      onSaved: entity => res.status(statusCodes.CREATED).send({
        ok: true,
        [key]: entity
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('notAllowed')
        ]
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        errors: [
          i18next.t('notFound'),
        ],
      }),
    };
  }

  static authenticatedFindCallback(res, key) {
    return {
      onFound: (entity) => res.status(statusCodes.OK).send({
        ok: true,
        [key]: entity,
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        error: i18next.t('notFound')
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('notAllowed')
        ]
      })
    };
  }

  static authenticatedSearchCallback(res, key) {
    return {
      onFound: (entities, pages) => res.status(statusCodes.OK).send({
        ok: true,
        [key]: entities,
        pages
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('notAllowed')
        ]
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        errors: [
          i18next.t('notFound')
        ]
      })
    };
  }
}
