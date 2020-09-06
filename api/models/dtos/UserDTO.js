import DTO from './DTO.js';
import EmailValidator from 'email-validator';
import isEmpty from 'lodash/isEmpty.js';
import isString from 'lodash/isString.js';

const MIN_LENGTH_EMAIL = 4;
const MAX_LENGTH_EMAIL = 100;
const MIN_LENGTH_PASSWORD = 6;
const MAX_LENGTH_PASSWORD = 20;
const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 200;

export default class UserDTO extends DTO {
  constructor({
    email,
    password,
    confirmPassword = null,
    id = null,
    isAdmin = false,
    name,
  }) {
    super('user');

    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.id = id;
    this.isAdmin = isAdmin;
    this.name = name;
  }

  isValidEmail() {
    const email = this?.email ?? '';

    return (
      !isEmpty(email) &&
      EmailValidator.validate(email) &&
      email.length <= MAX_LENGTH_EMAIL &&
      email.length > MIN_LENGTH_EMAIL
    );
  }

  isValidName() {
    const name = this?.name ?? '';

    return (
      !isEmpty(name) &&
      name.length >= MIN_LENGTH_NAME &&
      name.length < MAX_LENGTH_NAME
    );
  }

  isValidPassword() {
    const password = this?.password ?? '';

    return (
      isString(password) &&
      password?.length < MAX_LENGTH_PASSWORD &&
      password?.length >= MIN_LENGTH_PASSWORD
    );
  }

  isSamePassword() {
    return this?.password === this?.confirmPassword;
  }

  isSameUser(user) {
    return this?.id === user?.id;
  }

  async isNewEmail({ repositories: { UserRepository } }) {
    const user = await UserRepository.findByEmail(this.email);

    return isEmpty(user) || user?.id === this?.id;
  }

  encryptPassword({ services: { Encrypt } }) {
    this.password = Encrypt.encrypt(this.password);
  }

  decryptPassword({ services: { Encrypt } }) {
    this.password = Encrypt.decrypt(this.password);
  }

  canSave({ services: { Token } }, token) {
    const decryptedToken = Token.decrypt(token);

    if (!decryptedToken) return false;

    return decryptedToken.isAdmin;
  }

  canChange({ id }) {
    return (
      this.isAdmin ||
      this.id === id
    );
  }

  async validate(dependencies, callback) {
    this.removeEmptyProps();

    const errors = [ ];

    if (!this.isValidEmail()) errors.push(this.errorMessage('invalidEmail', {
      minLength: MIN_LENGTH_EMAIL,
      maxLength: MAX_LENGTH_EMAIL
    }));

    if (!await this.isNewEmail(dependencies)) errors.push(this.errorMessage('duplicatedEmail'));

    if (!this.isValidPassword()) errors.push(this.errorMessage('invalidPassword', {
      minLength: MIN_LENGTH_PASSWORD,
      maxLength: MAX_LENGTH_PASSWORD
    }));

    if (!this.isSamePassword()) errors.push(this.errorMessage('differentPassword'));

    if (!this.isValidName()) errors.push(this.errorMessage('invalidName', {
      minLength: MIN_LENGTH_NAME,
      maxLength: MAX_LENGTH_NAME,
    }));

    return errors.length ? callback.onInvalidated(errors) : callback.onValidated();
  }
}
