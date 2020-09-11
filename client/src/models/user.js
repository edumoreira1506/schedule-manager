import { getUser } from '../services/LocalStorage';
import { adminRoutes, userRoutes, privateRoutes } from '../config/constants';

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

export const register = async (user, callback, userService) => {
  const apiReponse = await userService.register(user);

  return apiReponse.ok ? callback.onSuccess() : callback.onError(apiReponse.errors.join(' '));
};

export const update = async (userId, user, callback, userService) => {
  const apiReponse = await userService.update(userId, user);

  return apiReponse.ok ? callback.onSuccess() : callback.onError(apiReponse.errors.join(' '));
};

export const show = async (userId, callback, userService) => {
  const apiReponse = await userService.show(userId);

  return apiReponse.ok ? callback.onSuccess(apiReponse.user) : callback.onError(apiReponse.errors.join(' '));
};

const sharedRoutes = [
  {
    href: privateRoutes.EDIT_PROFILE,
    i18nKey: 'editProfile',
  },
  {
    href: privateRoutes.EDIT_PASSWORD,
    i18nKey: 'editPassword',
  },
];

export const getMenuLinks = (user) => (user.isAdmin ? [
  {
    href: adminRoutes.HOME,
    i18nKey: 'home',
  },
  {
    href: adminRoutes.USERS,
    i18nKey: 'listUsers',
  },
  {
    href: adminRoutes.NEW_USER,
    i18nKey: 'newUser',
  },
  {
    href: adminRoutes.TASKS,
    i18nKey: 'tasks',
  },
  {
    href: adminRoutes.NEW_TASK,
    i18nKey: 'newTask',
  },
  ...sharedRoutes,
] : [
  {
    href: userRoutes.HOME,
    i18nKey: 'home',
  },
  {
    href: userRoutes.TASKS,
    i18nKey: 'myTasks',
  },
  ...sharedRoutes,
]);
