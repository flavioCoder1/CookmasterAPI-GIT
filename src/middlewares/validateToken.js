const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'abcdef';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'jwt malformed' });
  try {
    const payload = jwt.verify(token, SECRET);
    const isValidEmail = await userModel.getByEmail(payload.email);
    if (!isValidEmail) return res.status(401).json({ message: 'jwt malformed' });
    const { password, ...userWithoutPassword } = isValidEmail;
    req.user = userWithoutPassword;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const validateTokenRecipe = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const payload = jwt.verify(token, SECRET);
    const isValidEmail = await userModel.getByEmail(payload.email);
    if (!isValidEmail) return res.status(401).json({ message: 'missing auth token' });
    const { password, ...userWithoutPassword } = isValidEmail;
    req.user = userWithoutPassword;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
    validateToken,
    validateTokenRecipe,
};