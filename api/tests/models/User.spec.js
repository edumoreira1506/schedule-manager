import dependenciesMock from '../mocks/dependenciesMock.js';
import * as User from '../../models/User.js';
import userFactory from '../factories/userFactory.js';

describe('User model', () => {
  describe('store', () => {
    let callback;

    beforeEach(() => {
      callback = {
        onNotAllowed: jest.fn(),
        onError: jest.fn(),
        onSaved: jest.fn(),
      }
    });

    describe('validations', () => {
      describe('name', () => {
        it('can not be empty', async () => {
          const name = '';
          const token = 'token!';
          const user = userFactory({ name });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be so short', async () => {
          const name = 'Ed';
          const token = 'token!';
          const user = userFactory({ name });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be so big', async () => {
          const name = Array(500).fill('').join('');
          const token = 'token!';
          const user = userFactory({ name });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });
      });

      describe('password', () => {
        it('can not be different of confirmPassword', async () => {
          const password = 'Password';
          const confirmPassword = 'MyConfirm';
          const token = 'token!';
          const user = userFactory({ password, confirmPassword });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be empty', async () => {
          const password = '';
          const token = 'token!';
          const user = userFactory({ password });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be so short', async () => {
          const password = 'Ed';
          const token = 'token!';
          const user = userFactory({ password });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be so big', async () => {
          const password = Array(500).fill('').join('');
          const token = 'token!';
          const user = userFactory({ password });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });
      });

      describe('email', () => {
        it('can not be empty', async () => {
          const email = '';
          const token = 'token!';
          const user = userFactory({ email });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be invalid', async () => {
          const email = 'fake @ test';
          const token = 'token!';
          const user = userFactory({ email });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be so big', async () => {
          const email = Array(500).fill('').join('');
          const token = 'token!';
          const user = userFactory({ email });
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findByEmail: jest.fn().mockReturnValue(null),
            save: jest.fn().mockReturnValue(user),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser }
          });
    
          await User.store(user, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });
      });
    });

    it('has the correct behavior when user can be stored', async () => {
      const token = 'token!';
      const user = userFactory();
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUser = {
        findByEmail: jest.fn().mockReturnValue(null),
        save: jest.fn().mockReturnValue(user),
      };
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser }
      });

      await User.store(user, token, callback, dependencies);

      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onError).not.toHaveBeenCalled();
      expect(callback.onSaved).toHaveBeenCalledWith(user);
    });

    it('has the correct behavior when user does not send token', async () => {
      const token = null;
      const user = userFactory();
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUser = {
        findByEmail: jest.fn().mockReturnValue(null),
        save: jest.fn().mockReturnValue(user),
      };
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser }
      });
  
      await User.store(user, token, callback, dependencies);
  
      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onError).not.toHaveBeenCalled();
      expect(callback.onSaved).toHaveBeenCalledWith(user);
    });

    it('has the correct behavior when user of token is not admin', async () => {
      const token = null;
      const user = userFactory({ isAdmin: false });
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUser = {
        findByEmail: jest.fn().mockReturnValue(null),
        save: jest.fn().mockReturnValue(user),
      };
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser }
      });
  
      await User.store(user, token, callback, dependencies);
  
      expect(callback.onNotAllowed).toHaveBeenCalled();
      expect(callback.onError).not.toHaveBeenCalled();
      expect(callback.onSaved).not.toHaveBeenCalled();
    });

    it('has the correct behavior when email is being used', async () => {
      const token = null;
      const user = userFactory();
      const userOfToken = userFactory({ id: user.id + 1 });
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUser = {
        findByEmail: jest.fn().mockReturnValue(userOfToken),
        save: jest.fn().mockReturnValue(user),
      };
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser }
      });
  
      await User.store(user, token, callback, dependencies);
  
      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onError).toHaveBeenCalled();
      expect(callback.onSaved).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    let callback;

    beforeEach(() => {
      callback = {
        onAllowed: jest.fn(),
        onNotAllowed: jest.fn(),
      }
    });

    it('has the correct behavior when user does not send email or password', async () => {
      const dependencies = dependenciesMock();
      const email = null;
      const password = null;

      await User.login(email, password, callback, dependencies);

      expect(callback.onNotAllowed).toHaveBeenCalled();
      expect(callback.onAllowed).not.toHaveBeenCalled();
    });

    it('has the correct behavior when email does not exist ou our database', async () => {
      const fakeUserRepository = {
        findByEmail: jest.fn().mockReturnValue(null)
      };
      const dependencies = dependenciesMock({ repositories: { UserRepository: fakeUserRepository } });
      const email = 'email@email.com';
      const password = 'Password10#';

      await User.login(email, password, callback, dependencies);

      expect(callback.onNotAllowed).toHaveBeenCalled();
      expect(callback.onAllowed).not.toHaveBeenCalled();
    });

    it('has the correct behavior when the pasword is different', async () => {
      const password = 'Password10#';
      const wrongPassword = 'foo-bar';
      const user = userFactory({ password });
      const fakeUserRepository = {
        findByEmail: jest.fn().mockReturnValue(user)
      };
      const dependencies = dependenciesMock({ repositories: { UserRepository: fakeUserRepository } });
      const email = 'email@email.com';

      await User.login(email, wrongPassword, callback, dependencies);

      expect(callback.onNotAllowed).toHaveBeenCalled();
      expect(callback.onAllowed).not.toHaveBeenCalled();
    });

    it('has the correct bevaior when are valid credentials', async () => {
      const password = 'Password10#';
      const email = 'email@email.com';
      const token = 'token!';
      const user = userFactory({ email, password });
      const fakeUserRepository = {
        findByEmail: jest.fn().mockReturnValue(user),
      };
      const fakeEncrypt = {
        decrypt: jest.fn().mockReturnValue(password),
      };
      const fakeToken = {
        create: jest.fn().mockReturnValue(token),
      }
      const dependencies = dependenciesMock({
        repositories: { UserRepository: fakeUserRepository },
        services: { Encrypt: fakeEncrypt, Token: fakeToken }
      });

      await User.login(email, password, callback, dependencies);

      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onAllowed).toHaveBeenCalledWith(user, token);
    });
  });

  describe('index', () => {
    let callback;

    beforeEach(() => {
      callback = {
        onNotAllowed: jest.fn(),
        onFound: jest.fn(),
      }
    });

    it('has the correct behavior when user is admin', async () => {
      const token = 'token!';
      const user = userFactory();
      const keyword = '';
      const page = 0;
      const pages = 0;
      const users = [];
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUser = {
        search: jest.fn().mockReturnValue(users),
        countPages: jest.fn().mockReturnValue(pages),
      };
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser }
      });

      await User.index(token, keyword, page, callback, dependencies);

      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onFound).toHaveBeenCalledWith(users, pages);
    });

    it('has the correct behavior when user is not admin', async () => {
      const token = 'token!';
      const user = userFactory({ isAdmin: false });
      const keyword = '';
      const page = 0;
      const pages = 0;
      const users = [];
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUser = {
        search: jest.fn().mockReturnValue(users),
        countPages: jest.fn().mockReturnValue(pages),
      };
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser },
      });

      await User.index(token, keyword, page, callback, dependencies);

      expect(callback.onNotAllowed).toHaveBeenCalled();
      expect(callback.onFound).not.toHaveBeenCalled();
    });
  });

  describe('show', () => {
    let callback;

    beforeEach(() => {
      callback = {
        onNotAllowed: jest.fn(),
        onFound: jest.fn(),
        onNotFound: jest.fn(),
      }
    });

    it('has the correct behavior when user of token is admin', async () => {
      const token = 'token!';
      const user = userFactory();
      const userId = 1;
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUser = {
        findById: jest.fn().mockReturnValue(user),
      }
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser },
      });

      await User.show(token, userId, callback, dependencies);

      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onFound).toHaveBeenCalledWith(user);
      expect(callback.onNotFound).not.toHaveBeenCalled();
    });

    it('has the correct behavior when is same user', async () => {
      const token = 'token!';
      const user = userFactory({ isAdmin: false });
      const userId = 1;
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUserRepository = {
        findById: jest.fn().mockReturnValue(user),
      }
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUserRepository },
      });

      await User.show(token, userId, callback, dependencies);

      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onFound).toHaveBeenCalledWith(user);
      expect(callback.onNotFound).not.toHaveBeenCalled();
    });

    it('has the correct behavior when is not same user and is not admin', async () => {
      const token = 'token!';
      const user = userFactory({ isAdmin: false });
      const anotherUser = userFactory({ ...user, id: user.id + 1 });
      const userId = 1;
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(anotherUser),
      };
      const fakeUserRepository = {
        findById: jest.fn().mockReturnValue(user),
      }
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUserRepository },
      });

      await User.show(token, userId, callback, dependencies);

      expect(callback.onNotAllowed).toHaveBeenCalled();
      expect(callback.onFound).not.toHaveBeenCalled();
      expect(callback.onNotFound).not.toHaveBeenCalled();
    });

    it('has the correct behavior when is not found user', async () => {
      const token = 'token!';
      const userOfToken = userFactory();
      const user = null;
      const userId = 1;
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(userOfToken),
      };
      const fakeUserRepository = {
        findById: jest.fn().mockReturnValue(user),
      }
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUserRepository },
      });

      await User.show(token, userId, callback, dependencies);

      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onFound).not.toHaveBeenCalled();
      expect(callback.onNotFound).toHaveBeenCalled();
    });
  });
});
