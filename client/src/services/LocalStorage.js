const getLocalStorageItem = (key) => window.localStorage.getItem(key);

export const getUser = () => getLocalStorageItem('user');

export const getToken = () => getLocalStorageItem('token');
