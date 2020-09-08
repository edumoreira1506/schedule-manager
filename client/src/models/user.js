import { getUser } from '../services/LocalStorage';
import { adminRoutes, userRoutes } from '../config/constants';

export const isAuthenticated = () => Boolean(getUser());

export const getMainRoute = ({ isAdmin }) => (isAdmin ? adminRoutes.HOME : userRoutes.HOME);
