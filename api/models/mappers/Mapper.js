export default class Mapper {
  static toEntity(dto) {
    const entries = Object.entries(dto);
    const filteredEntries = entries.filter(([ key, value ]) => Boolean(key) && typeof value !== 'function');
    const entity = Object.fromEntries(filteredEntries);

    return entity;
  }
}
