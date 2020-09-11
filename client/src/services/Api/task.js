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