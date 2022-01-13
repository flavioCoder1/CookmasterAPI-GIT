const router = require('express').Router();
const userController = require('../controllers/userController');
const { validateEmail, validateUserEntries } = require('../middlewares/validationsUser');

router.post('/', validateUserEntries, validateEmail, userController.create);

module.exports = router;