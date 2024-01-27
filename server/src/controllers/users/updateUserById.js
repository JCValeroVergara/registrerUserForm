const { models } = require('../../db/sequelize');

const updateUserById = async (id, { name, lastname, email, age, gender, nationality, country, city, address, phone, civil_status, sons, sons_number }) => {
  const user = await models.User.findByPk(id);

  if (user) {
    user.name = name ? name : user.name;
    user.lastname = lastname ? lastname : user.lastname;
    user.email = email ? email : user.email;
    user.age = age ? age : user.age;
    user.gender = gender ? gender : user.gender;
    user.nationality = nationality ? nationality : user.nationality;
    user.country = country ? country : user.country;
    user.city = city ? city : user.city;
    user.address = address ? address : user.address;
    user.phone = phone ? phone : user.phone;
    user.civil_status = civil_status ? civil_status : user.civil_status;
    user.sons = sons ? sons : user.sons;
    user.sons_number = sons_number ? sons_number : user.sons_number;

    await user.save();
  }
  return user;
}

module.exports = updateUserById;
