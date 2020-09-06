'use strict';

const CryptoJS = require('crypto-js');
const moment = require('moment');

const CRYPTO_KEY = process.env.CRYPTO_KEY;
const password = CryptoJS.AES.encrypt('Password102030', CRYPTO_KEY).toString();

module.exports = {
  up: async queryInterface => await queryInterface.bulkInsert('Users', [
    {
      email: 'admin@admin.com',
      isAdmin: true,
      name: 'Admin',
      password,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
  ], {}),

  down: async queryInterface => await queryInterface.bulkDelete('Users', null, {}),
};
