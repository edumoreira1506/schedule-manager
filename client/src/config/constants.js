export const publicRoutes = {
  LOGIN: '/login',
};

export const adminRoutes = {
  HOME: '/admin/home',
  USERS: '/admin/users',
  NEW_USER: '/admin/users/new',
  EDIT_USER: (id) => `/admin/users/${id}/edit`,
  EDIT_PASSWORD: (id) => `/admin/users/${id}/edit_password`,
};

export const userRoutes = {
  HOME: '/user/home',
};
