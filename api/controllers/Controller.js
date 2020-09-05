import { statusCodes } from '../config/constants.js';
import i18next from 'i18next';

export default class Controller {
  static getToken(req) {
    const token = req?.header('Authorization') ?? '';

    return token;
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
          i18next.t('common.successfullyUpdated')
        ]
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        errors: [
          i18next.t('common.notFound'),
        ],
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('common.notAllowed')
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
          i18next.t('common.successfullyRemoved'),
        ],
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        errors: [
          i18next.t('common.notFound'),
        ],
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('common.notAllowed')
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
          i18next.t('common.notAllowed')
        ]
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        errors: [
          i18next.t('common.notFound'),
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
        error: i18next.t('common.notFound')
      }),
      onNotAllowed: () => res.status(statusCodes.NOT_ALLOWED).send({
        ok: false,
        errors: [
          i18next.t('common.notAllowed')
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
          i18next.t('common.notAllowed')
        ]
      }),
      onNotFound: () => res.status(statusCodes.NOT_FOUND).send({
        ok: false,
        errors: [
          i18next.t('common.notFound')
        ]
      })
    };
  }
}
