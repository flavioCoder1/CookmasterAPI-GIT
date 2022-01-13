const userService = require('../services/userService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { code, message, user } = await userService.create(name, email, password);
  if (code) return res.status(code).json({ message });
  res.status(201).json({ user });
};

module.exports = {
  create,
};