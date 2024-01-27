const { models } = require('../../db/sequelize');

const getAllUsers = async (id) => {
  const users = await models.User.findByPk(id);
  return users;
}

module.exports = getAllUsers;
