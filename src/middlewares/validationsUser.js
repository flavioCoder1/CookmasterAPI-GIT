// Regex de validação retirado de :
// // https://www.ti-enxame.com/pt/javascript/validacao-de-e-mail-de-expressao-regular-em-javascript/957575053/
const validateUserEntries = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    next();
  };
  
  const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!re.test(email)) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    next();
  };
  
  module.exports = {
    validateUserEntries,
    validateEmail,
  };