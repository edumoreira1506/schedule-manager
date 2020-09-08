import dependenciesMock from '../mocks/dependenciesMock.js';
import * as Task from '../../models/Task.js';
import taskFactory from '../factories/taskFactory.js';
import userFactory from '../factories/userFactory.js';

describe('Task model', () => {
  describe('store', () => {
    let callback;

    beforeEach(() => {
      callback = {
        onNotAllowed: jest.fn(),
        onError: jest.fn(),
        onSaved: jest.fn(),
        onNotFound: jest.fn(),
      }
    });

    describe('validations', () => {
      describe('description', () => {
        it('can not be empty', async () => {
          const description = '';
          const token = 'token!';
          const user = userFactory();
          const task = taskFactory({ description });
          const userId = user.id;
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findById: jest.fn().mockReturnValue(user),
          };
          const fakeTask = {
            save: jest.fn().mockReturnValue(task),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
          });
    
          await Task.store(task, userId, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onNotFound).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be so short', async () => {
          const description = 'ab';
          const token = 'token!';
          const user = userFactory();
          const task = taskFactory({ description });
          const userId = user.id;
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findById: jest.fn().mockReturnValue(user),
          };
          const fakeTask = {
            save: jest.fn().mockReturnValue(task),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
          });
    
          await Task.store(task, userId, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onNotFound).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('can not be so big', async () => {
          const description = Array(300).fill('').join('');
          const token = 'token!';
          const user = userFactory();
          const task = taskFactory({ description });
          const userId = user.id;
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findById: jest.fn().mockReturnValue(user),
          };
          const fakeTask = {
            save: jest.fn().mockReturnValue(task),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
          });
    
          await Task.store(task, userId, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onNotFound).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });
      });

      describe('startedAt', () => {
        it('can not be an invalid date', async () => {
          const startedAt = 'wrong';
          const token = 'token!';
          const user = userFactory();
          const task = taskFactory({ startedAt });
          const userId = user.id;
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findById: jest.fn().mockReturnValue(user),
          };
          const fakeTask = {
            save: jest.fn().mockReturnValue(task),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
          });
    
          await Task.store(task, userId, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onNotFound).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });
      });

      describe('finishedAt', () => {
        it('can not be an invalid date', async () => {
          const finishedAt = 'wrong';
          const token = 'token!';
          const user = userFactory();
          const task = taskFactory({ finishedAt });
          const userId = user.id;
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findById: jest.fn().mockReturnValue(user),
          };
          const fakeTask = {
            save: jest.fn().mockReturnValue(task),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
          });
    
          await Task.store(task, userId, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onNotFound).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });
      });

      describe('dates', () => {
        it('can not have just finishedAt', async () => {
          const finishedAt = '2020-01-01';
          const startedAt = null;
          const token = 'token!';
          const user = userFactory();
          const task = taskFactory({ finishedAt, startedAt });
          const userId = user.id;
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findById: jest.fn().mockReturnValue(user),
          };
          const fakeTask = {
            save: jest.fn().mockReturnValue(task),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
          });
    
          await Task.store(task, userId, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onNotFound).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });

        it('finishedAt can not be before startedAt', async () => {
          const finishedAt = '2020-01-01';
          const startedAt = '2020-02-02';
          const token = 'token!';
          const user = userFactory();
          const task = taskFactory({ finishedAt, startedAt });
          const userId = user.id;
          const fakeToken = {
            decrypt: jest.fn().mockReturnValue(user),
          };
          const fakeUser = {
            findById: jest.fn().mockReturnValue(user),
          };
          const fakeTask = {
            save: jest.fn().mockReturnValue(task),
          };
          const dependencies = dependenciesMock({
            services: { Token: fakeToken },
            repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
          });
    
          await Task.store(task, userId, token, callback, dependencies);
    
          expect(callback.onNotAllowed).not.toHaveBeenCalled();
          expect(callback.onNotFound).not.toHaveBeenCalled();
          expect(callback.onError).toHaveBeenCalled();
          expect(callback.onSaved).not.toHaveBeenCalled();
        });
      });
    });

    it('has the correct behavior when user does not exist', async () => {
      const token = 'token!';
      const user = null;
      const userOfToken = userFactory();
      const task = taskFactory();
      const userId = null;
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(userOfToken),
      };
      const fakeUser = {
        findById: jest.fn().mockReturnValue(user),
      };
      const fakeTask = {
        save: jest.fn().mockReturnValue(task),
      };
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
      });

      await Task.store(task, userId, token, callback, dependencies);

      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onNotFound).toHaveBeenCalled();
      expect(callback.onError).not.toHaveBeenCalled();
      expect(callback.onSaved).not.toHaveBeenCalled();
    });

    it('has the correct behavior when user can save the task', async () => {
      const token = 'token!';
      const user = userFactory();
      const task = taskFactory();
      const userId = user.id;
      const fakeToken = {
        decrypt: jest.fn().mockReturnValue(user),
      };
      const fakeUser = {
        findById: jest.fn().mockReturnValue(user),
      };
      const fakeTask = {
        save: jest.fn().mockReturnValue(task),
      };
      const dependencies = dependenciesMock({
        services: { Token: fakeToken },
        repositories: { UserRepository: fakeUser, TaskRepository: fakeTask },
      });

      await Task.store(task, userId, token, callback, dependencies);

      expect(callback.onNotAllowed).not.toHaveBeenCalled();
      expect(callback.onNotFound).not.toHaveBeenCalled();
      expect(callback.onError).not.toHaveBeenCalled();
      expect(callback.onSaved).toHaveBeenCalledWith(task);
    });
  });
});
