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
});
