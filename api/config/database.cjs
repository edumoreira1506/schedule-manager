module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  maxConcurrentQueries: 100,
  pool: {
    maxConnections: 5,
    maxIdleTime: 30
  },
  additional: {
    timestamps: true,
    underscored: true
  },
};
