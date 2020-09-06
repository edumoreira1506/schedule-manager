import i18next from 'i18next';

export default class Repository {
  constructor({ model }) {
    this.model = model;
  }

  async save(entity) {
    try {
      return await this.model.create(entity);
    } catch {
      return null;
    }
  }

  async findById(id) {
    if (!id) return null;
  
    try {
      const test = await this.model.findByPk(id);
  
      if (!test) return null;
  
      return test.dataValues;
    } catch {
      return null;
    }
  }

  async updateById(id, newProps, callback) {
    try {
      await this.model.update(newProps, {
        where: {
          id,
        }
      }).then(callback.onUpdated).catch(callback.onError);
    } catch {
      return callback.onError([ i18next.t('somethingWrong') ]);
    }
  }
}
