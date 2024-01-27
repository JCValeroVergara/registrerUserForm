const { models } = require('../../db/sequelize');

const create = async ({ name, lastname, email, age, gender, nationality, country, city, address, phone, civil_status, sons, sons_number }) => {
  const user = await models.User.create({ name, lastname, email, age, gender, nationality, country, city, address, phone, civil_status, sons, sons_number });
  return user;
}

module.exports = create;

