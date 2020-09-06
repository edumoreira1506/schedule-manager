import i18next from 'i18next';

export default class DTO {
  constructor(modelName) {
    this.modelName = modelName;
  }

  errorMessage(message, params) {
    return i18next.t(`models.${this.modelName}.messages.errors.${message}`, params);
  }

  addProps(newProps) {
    for (const key in newProps) {
      this[key] = newProps[key];
    }
  }

  removeEmptyProps() {
    const objectArray = Object.entries(this);
    const filteredArray = objectArray.filter(([ , value ]) => Boolean(value) && value !== false);
    const newObject = Object.fromEntries(filteredArray);

    this.prototype = newObject;
  }
}
