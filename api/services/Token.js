import moment from 'moment';
import Encrypt from './Encrypt.js';

export default class Token {
  static MAX_DAY_OF_TOKEN = 7;

  static create(fieldsOfToken) {
    const objectToken = { ...fieldsOfToken, createdAt: moment().format() };
    const jsonToken = JSON.stringify(objectToken);
    const encryptedToken = Encrypt.encrypt(jsonToken);
    const base64Token = Encrypt.encryptBase64(encryptedToken);

    return base64Token;
  }

  static decrypt(base64EncryptedToken) {
    const encryptedToken = Encrypt.decryptBase64(base64EncryptedToken);

    if (!encryptedToken) return null;
    
    try {
      const jsonToken = Encrypt.decrypt(encryptedToken);

      if (!jsonToken) return null;

      const objectUser = JSON.parse(jsonToken);

      if (!objectUser) return null;
      
      const isValidToken = moment().diff(objectUser.createdAt, 'days') <= Token.MAX_DAY_OF_TOKEN;
 
      if (!isValidToken) return null;

      return objectUser;
    } catch {
      return null;
    }
  }
}
