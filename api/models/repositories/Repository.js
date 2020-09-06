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
}
