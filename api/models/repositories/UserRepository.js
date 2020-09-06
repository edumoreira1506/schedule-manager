import Sequelize from 'sequelize';
import Repository from './Repository.js';

const { Model, DataTypes } = Sequelize;

export class User extends Model {
  static init(sequelize) {
    super.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
    }, {
      sequelize
    });
  }
}

export const save = async user => {
  const repository = new Repository({ model: User });

  return await repository.save(user);
};

export const findByEmail = async email => {
  if (!email) return null;
  
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) return null;
 
    return user.dataValues;
  } catch {
    return null;
  }
};

