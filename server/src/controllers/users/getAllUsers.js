const { models } = require('../../db/sequelize');

const getAllUsers = async () => {
  const users = await models.User.findAll();
  return users;
}

module.exports = getAllUsers;
