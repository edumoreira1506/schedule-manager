import Sequelize from 'sequelize';
import Repository from './Repository.js';
import Pages from '../../services/Pages.js';
import { ITEMS_PER_PAGE } from '../../config/constants.js';

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

export const search = async (keyWord = '', page = 0) => await User.findAll({
  where: {
    [Sequelize.Op.or]: [
      {
        email: {
          [Sequelize.Op.like]: `%${keyWord}%`
        }
      },
    ],
  },
  order: [
    ['id', 'ASC'],
  ],
  offset: page * ITEMS_PER_PAGE,
  limit: ITEMS_PER_PAGE
});

export const countPages = async () => {
  const amount = await User.count();
  const amountOfPages = Pages.calcPages(amount);

  return amountOfPages;
};

export const findById = async id => {
  const repository = new Repository({ model: User });
  
  return await repository.findById(id);
};
