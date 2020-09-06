export default class Repository {
  constructor({ model }) {
    this.model = model;
  }

  async save(entity) {
    try {
      await this.model.create(entity);
    } catch {
      return null;
    }
  }
}
