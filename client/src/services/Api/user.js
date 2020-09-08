import RootAPI from './root';

// eslint-disable-next-line import/prefer-default-export
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
