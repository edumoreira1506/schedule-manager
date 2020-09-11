export const publicRoutes = {
  LOGIN: '/login',
};

export const privateRoutes = {
  EDIT_PROFILE: '/edit_profile',
  EDIT_PASSWORD: '/edit_password',
};

export const adminRoutes = {
  HOME: '/admin/home',
  USERS: '/admin/users',
  NEW_USER: '/admin/users/new',
  EDIT_USER: (id) => `/admin/users/${id}/edit`,
  EDIT_PASSWORD: (id) => `/admin/users/${id}/edit_password`,
  TASKS: '/admin/tasks',
  NEW_TASK: '/admin/tasks/new',
};

export const userRoutes = {
  HOME: '/user/home',
};
