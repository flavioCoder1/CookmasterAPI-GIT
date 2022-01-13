const router = require('express').Router();
const loginController = require('../controllers/loginController');
const {
  validateEmail,
  validateLogin,
  validatePassword } = require('../middlewares/validationsLogin');

router.post('/', validateLogin, validateEmail, validatePassword, loginController.login);

module.exports = router;