import RootAPI from './root';

export const login = async (email, password) => {
  try {
    const { data } = await RootAPI.post('/auth', { email, password });

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
};

export const index = async (keyWord, page) => {
  try {
    const { data } = await RootAPI.get(`/user?keyword=${keyWord}&page=${page}`);

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
};

export const remove = async (userId) => {
  try {
    const { data } = await RootAPI.delete(`/user/${userId}`);

    return data;
  } catch (error) {
    const errors = error?.response?.data?.errors ?? [];

    return {
      ok: false,
      errors,
    };
  }
}
