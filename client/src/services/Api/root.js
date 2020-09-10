import axios from 'axios';
import { getToken } from '../LocalStorage';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
  },
});

// eslint-disable-next-line func-names
api.setToken = function () {
  this.defaults.headers.common.Authorization = getToken();
};

export default api;
