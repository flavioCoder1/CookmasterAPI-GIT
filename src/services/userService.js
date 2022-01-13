const userModel = require('../models/userModel');

const create = async (name, email, password, role = 'user') => {
  try {
    const users = await userModel.getAll();
    if (users.some((user) => user.email === email)) {
      return { code: 409, message: 'Email already registered' };
    }
    const response = await userModel.create(name, email, password, role);
    return response;
  } catch (err) {
    console.log('errService', err);
  }
};

module.exports = {
  create,
};