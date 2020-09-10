export const publicRoutes = {
  LOGIN: '/login',
};

export const adminRoutes = {
  HOME: '/admin/home',
  USERS: '/admin/users',
  NEW_USER: '/admin/users/new',
  EDIT_USER: (id) => `/admin/users/${id}/edit`,
};

export const userRoutes = {
  HOME: '/user/home',
};
