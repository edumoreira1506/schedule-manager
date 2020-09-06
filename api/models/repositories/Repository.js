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
}
