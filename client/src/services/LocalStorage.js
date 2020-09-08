const USER_KEY = 'user';
const TOKEN_KEY = 'token';

const getLocalStorageItem = (key) => window.localStorage.getItem(key);

const setLocalStorageItem = (key, value) => window.localStorage.setItem(key, value);

export const getUser = () => JSON.parse(getLocalStorageItem(USER_KEY));

export const getToken = () => getLocalStorageItem(TOKEN_KEY);

export const setUser = (user) => setLocalStorageItem(USER_KEY, JSON.stringify(user));

export const setToken = (token) => setLocalStorageItem(TOKEN_KEY, token);
