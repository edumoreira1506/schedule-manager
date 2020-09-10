import { getUser } from '../services/LocalStorage';
import { adminRoutes, userRoutes } from '../config/constants';

export const isAuthenticated = () => Boolean(getUser());

export const getMainRoute = ({ isAdmin } = {}) => (isAdmin ? adminRoutes.HOME : userRoutes.HOME);

export const login = async (email, password, callback, userService) => {
  const apiReponse = await userService.login(email, password);

  return apiReponse.ok ? callback.onSuccess(apiReponse.token, apiReponse.user) : callback.onError(apiReponse.errors.join(' '));
};

export const index = async (keyWord, page, callback, userService) => {
  const apiReponse = await userService.index(keyWord, page);

  return apiReponse.ok ? callback.onSuccess(apiReponse.users, apiReponse.pages) : callback.onError(apiReponse.errors.join(' '));
};

export const remove = async (userId, callback, userService) => {
  const apiReponse = await userService.remove(userId);

  return apiReponse.ok ? callback.onSuccess() : callback.onError(apiReponse.errors.join(' ')); 
};

export const getMenuLinks = (user) => (user.isAdmin ? [
  {
    href: adminRoutes.HOME,
    i18nKey: 'home',
  },
  {
    href: adminRoutes.USERS,
    i18nKey: 'listUsers',
  },
] : [
  {
    href: userRoutes.HOME,
    i18nKey: 'home',
  },
]);
