const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'postgres',
  logging: false,
});

async function connectDatabase() {
  await sequelize.authenticate();
  console.log('Database connection established successfully.');
}

async function syncDatabase() {
  await sequelize.sync({ alter: true });
  console.log('Database synchronized successfully.');
}

module.exports = {
  sequelize,
  connectDatabase,
  syncDatabase,
};
