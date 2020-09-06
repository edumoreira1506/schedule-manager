import CryptoJS from 'crypto-js';

const CRYPTO_KEY = process.env.CRYPTO_KEY;

export default class Encrypt { 
  static encrypt(word) {
    const encryptedWord = CryptoJS.AES.encrypt(word, CRYPTO_KEY).toString();

    return encryptedWord;
  }

  static decrypt(encryptedWord) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedWord, CRYPTO_KEY);
      const descryptedWord = bytes.toString(CryptoJS.enc.Utf8);

      return descryptedWord;
    } catch {
      return null;
    }
  }

  static encryptBase64(word) {
    try {
      const wordArray = CryptoJS.enc.Utf8.parse(word);
      const base64 = CryptoJS.enc.Base64.stringify(wordArray);
    
      return base64; 
    } catch {
      return null;
    }
  }

  static decryptBase64(base64) {
    try {
      const parsedWordArray = CryptoJS.enc.Base64.parse(base64);
      const string = parsedWordArray.toString(CryptoJS.enc.Utf8);

      return string;
    } catch {
      return null;
    }
  }
}
