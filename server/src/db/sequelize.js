require('dotenv').config();
const { Sequelize } = require('sequelize');
const setupModels = require('../models');

const sequelize = new Sequelize(
  process.env.DB_STRING,
  {
    dialect: 'postgres',
    logging: false,
  }
);
const models = setupModels(sequelize);


const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Models synchronized with the database');
  } catch (error) {
    console.error('Unable to sync models with the database:', error);
  }
}

module.exports = { sequelize, models, syncModels };
