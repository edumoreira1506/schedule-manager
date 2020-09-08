import DTO from './DTO.js';
import isEmpty from 'lodash/isEmpty.js';
import isString from 'lodash/isString.js';
import moment from 'moment';

const MIN_LENGTH_DESCRIPTION = 3;
const MAX_LENGTH_DESCRIPTION = 200;

export default class TaskDTO extends DTO {
  constructor({
    id = null,
    description,
    startedAt,
    finishedAt,
  }) {
    super('task');

    this.description = description;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.id = id;
  }

  isStarted() {
    const startedAt = this?.startedAt;

    return !isEmpty(startedAt);
  }

  isFinished() {
    const finishedAt = this?.finishedAt;

    return !isEmpty(finishedAt);
  }

  isValidDescription() {
    const description = this?.description ?? '';

    return (
      !isEmpty(description) && isString(description) &&
      description.length >= MIN_LENGTH_DESCRIPTION && description.length < MAX_LENGTH_DESCRIPTION
    );
  }

  isValidStartedAt() {
    const startedAt = this?.startedAt ?? '';

    return (
      !isEmpty(startedAt) && moment(startedAt).isValid()
    );
  }

  isValidFinishedAt() {
    const finishedAt = this?.finishedAt ?? '';

    return (
      !isEmpty(finishedAt) && moment(finishedAt).isValid()
    );
  }

  isValidDates() {
    if (!this.isFinished() || !this.isFinished()) return true;
    if (!this.isValidFinishedAt() || !this.isValidStartedAt()) return false;

    const finishedAt = this?.finishedAt ?? '';
    const startedAt = this?.startedAt ?? '';
    const differenceBetweenDates = moment(finishedAt).diff(startedAt, 'days');

    return differenceBetweenDates >= 0;
  }

  validate(callback) {
    this.removeEmptyProps();

    const errors = [ ];

    if (!this.isValidDescription()) errors.push(this.errorMessage('invalidDescription', {
      minLength: MIN_LENGTH_DESCRIPTION,
      maxLength: MAX_LENGTH_DESCRIPTION
    }));

    if (!this.isStarted() && this.isFinished()) errors.push(this.errorMessage('startedEmpty'));

    if (this.isStarted() && !this.isValidStartedAt()) errors.push(this.errorMessage('invalidStartedAt'));

    if (this.isFinished() && !this.isValidFinishedAt()) errors.push(this.errorMessage('invalidFinishedAt'));

    if (!this.isValidDates()) errors.push(this.errorMessage('invalidDates'));

    return errors.length ? callback.onInvalidated(errors) : callback.onValidated();
  }
}
