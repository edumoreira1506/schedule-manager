import Sequelize from 'sequelize';
import Repository from './Repository.js';

const { Model, DataTypes } = Sequelize;

export class Task extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
      startedAt: DataTypes.DATE,
      finishedAt: DataTypes.DATE,
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'responsible', as: 'user' });
  }
}

export const save = async task => {
  const repository = new Repository({ model: Task });

  return await repository.save(task);
};
