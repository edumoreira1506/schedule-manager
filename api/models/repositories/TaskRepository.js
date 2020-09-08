import Sequelize from 'sequelize';
import Repository from './Repository.js';
import Pages from '../../services/Pages.js';
import { ITEMS_PER_PAGE } from '../../config/constants.js';
import isEmpty from 'lodash/isEmpty.js';

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

const createFilters = ({
  keyWord = '',
  userId = null,
  startedAt = null,
  finishedAt = null,
}) => ({
  [Sequelize.Op.or]: [
    {
      description: {
        [Sequelize.Op.like]: `%${keyWord}%`
      }
    },
  ],
  ...(userId ? ({ responsible: userId }) : {}),
  ...(!isEmpty(startedAt) && isEmpty(finishedAt) ? ({
    [Sequelize.Op.or]: [
      {
        startedAt: new Date(startedAt)
      },
      {
        createdAt: new Date(startedAt)
      }
    ]
  }) : {}),
  ...(!isEmpty(finishedAt) && isEmpty(startedAt) ? ({
    [Sequelize.Op.or]: [
      {
        finishedAt: new Date(finishedAt)
      },
      {
        createdAt: new Date(finishedAt)
      }
    ]
  }) : {}),
  ...(!isEmpty(startedAt) && !isEmpty(finishedAt) ? ({
    [Sequelize.Op.and]: [
      {
        createdAt: {
          [Sequelize.Op.between]: [startedAt, finishedAt],
        },
      },
      {
        [Sequelize.Op.or]: [
          {
            startedAt: {
              [Sequelize.Op.between]: [startedAt, finishedAt],
            },
          },
          {
            startedAt: null
          }
        ],
      },
      {
        [Sequelize.Op.or]: [
          {
            finishedAt: {
              [Sequelize.Op.between]: [startedAt, finishedAt],
            },
          },
          {
            finishedAt: null
          }
        ],
      },
    ]
  }) : {}),
});

export const countPages = async filters => {
  const amount = await Task.count({
    where: createFilters(filters),
  });
  const amountOfPages = Pages.calcPages(amount);

  return amountOfPages;
};

export const search = async ({ page = 0, ...filters }) => await Task.findAll({
  where: createFilters({ page, ...filters }),
  order: [
    ['id', 'ASC'],
  ],
  offset: page * ITEMS_PER_PAGE,
  limit: ITEMS_PER_PAGE,
});

export const findById = async id => {
  const repository = new Repository({ model: Task });
  
  return await repository.findById(id);
};

export const updateById = async (id, newProps, callback) => {
  const repository = new Repository({ model: Task });

  return await repository.updateById(id, newProps, callback);
};

export const deleteById = async (id, callback) => {
  const repository = new Repository({ model: Task });

  return await repository.deleteById(id, callback);
};

