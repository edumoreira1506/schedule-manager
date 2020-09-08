import UserMapper from './mappers/UserMapper.js';

export const login = async (email, password, callback, dependencies) => {
  if (!email || !password) return callback.onNotAllowed();

  const {
    repositories: { UserRepository },
    services: { Encrypt, Token },
  } = dependencies;
  const user = await UserRepository.findByEmail(email);

  if (!user) return callback.onNotAllowed();

  const decryptedPassword = Encrypt.decrypt(user.password);

  if(decryptedPassword !== password) return callback.onNotAllowed();

  const token = Token.create(user);

  return callback.onAllowed(user, token);
};

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

export const index = async (token, keyWord, page, callback, dependencies) => {
  const { services: { Token }, repositories: { UserRepository } } = dependencies;
  const userOfToken = Token.decrypt(token);

  if (!userOfToken) return callback.onNotAllowed();

  const userDTO = UserMapper.toDTO(userOfToken);

  if (!userDTO.isAdmin) return callback.onNotAllowed();

  const users = await UserRepository.search(keyWord, page);
  const pages = await UserRepository.countPages();

  return callback.onFound(users, pages);
};

export const authenticateAsAdmin = async (token, callback, dependencies) => {
  const { services: { Token } } = dependencies;
  const userOfToken = Token.decrypt(token);

  if (!userOfToken) return callback.onNotAllowed();

  const userDTO = UserMapper.toDTO(userOfToken);

  if (!userDTO.isAdmin) return callback.onNotAllowed();

  return callback.onAllowed(userDTO);
};

const isAllowedToEditData = async (token, userId, callback, dependencies) => {
  const { services: { Token }, repositories: { UserRepository } } = dependencies;
  const userOfToken = Token.decrypt(token);

  if (!userOfToken) return callback.onNotAllowed();

  const user = await UserRepository.findById(userId);

  if (!user) return callback.onNotFound();

  const userDTO = UserMapper.toDTO(userOfToken);

  if (!userDTO.isAdmin && !userDTO.isSameUser(user)) return callback.onNotAllowed();

  return callback.onAllowed(user);
};

export const show = async (token, userId, callback, dependencies) => await isAllowedToEditData(token, userId, {
  ...callback,
  onAllowed: callback.onFound,
}, dependencies);

export const remove = async (token, userId, callback, dependencies) => await isAllowedToEditData(token, userId, {
  ...callback,
  onAllowed: async user => {
    const { repositories: { UserRepository } } = dependencies;

    return await UserRepository.deleteById(user.id, callback);
  },
}, dependencies);

export const update = async (token, newProps, userId, callback, dependencies) => await isAllowedToEditData(token, userId, {
  ...callback,
  onAllowed: async user => {
    const userDTO = UserMapper.toDTO(user);
    const { repositories: { UserRepository } } = dependencies;

    userDTO.decryptPassword(dependencies);
    userDTO.confirmPassword = userDTO.password;
    userDTO.addProps(newProps);

    return userDTO.validate(dependencies, {
      onInvalidated: callback.onError,
      onValidated: async () => {
        userDTO.encryptPassword(dependencies);

        return await UserRepository.updateById(userId, newProps, callback);
      }
    });
  }, 
}, dependencies);
