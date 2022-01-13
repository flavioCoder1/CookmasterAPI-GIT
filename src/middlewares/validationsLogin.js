const userModel = require('../models/userModel');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!re.test(email)) return res.status(401).json({ message: 'Incorrect username or password' });
  next();
};

const validatePassword = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.getByEmail(email);
  if (!user || password !== user.password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = {
  validateLogin,
  validateEmail,
  validatePassword,
};