import Sequelize from 'sequelize';

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
