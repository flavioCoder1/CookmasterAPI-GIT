const jwt = require('jsonwebtoken');

const jwtConfig = { expiresIn: '15m', algorithm: 'HS256' };

const SECRET = 'abcdef';

const login = async (req, res) => {
  const userSearch = req.body;
  const { password, ...userWithoutPassword } = userSearch;
  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);
  res.status(200).json({ token });
};

module.exports = {
  login,
};