const { models } = require('../../db/sequelize');

const deleteUserById = async (id) => {
  const user = await models.User.destroy({ where: { id } });
  return user;
}

module.exports = deleteUserById;
