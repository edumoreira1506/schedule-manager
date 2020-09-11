import RootAPI from './root';

export const all = async (filters) => {
  try {
    RootAPI.setToken();

    const { data } = await RootAPI.get('/task', { params: filters });

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
};

export const index = async (userId, filters) => {
  try {
    RootAPI.setToken();

    const { data } = await RootAPI.get(`/user/${userId}/task`, { params: filters });

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
};

export const remove = async (userId, taskId) => {
  try {
    RootAPI.setToken();

    const { data } = await RootAPI.delete(`/user/${userId}/task/${taskId}`);

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
};

export const show = async (userId, taskId) => {
  try {
    RootAPI.setToken();

    const { data } = await RootAPI.get(`/user/${userId}/task/${taskId}`);

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
};

export const update = async (userId, taskId, newProps) => {
  try {
    RootAPI.setToken();

    const { data } = await RootAPI.patch(`/user/${userId}/task/${taskId}`, newProps);

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
};

export const register = async (userId, task) => {
  try {
    RootAPI.setToken();

    const { data } = await RootAPI.post(`/user/${userId}/task`, task);

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
};
