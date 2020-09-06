import UserMapper from './mappers/UserMapper.js';

export const store = async (user, token, callback, dependencies) => {
  const userDTO = UserMapper.toDTO(user);

  return await userDTO.validate(dependencies, {
    onValidated: async () => {
      const canSave = await userDTO.canSave(dependencies, token);

      if (!canSave) return callback.onNotAllowed();

      userDTO.encryptPassword(dependencies);

      const { repositories: { UserRepository } } = dependencies;
      const user = await UserRepository.save(UserMapper.toEntity(userDTO));

      return callback.onSaved(user);
    },
    onInvalidated: callback.onError
  });
};
