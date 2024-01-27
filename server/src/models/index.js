const { User, UserSchema } = require('../models/users');


function setupModels(sequelize) {
  const models = {
    User: User.init(UserSchema, User.config(sequelize)),
  };

  return models;
}

module.exports = setupModels;
