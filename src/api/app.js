const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const userRoute = require('../routes/userRoute');
const loginRoute = require('../routes/loginRoute');
const recipeRoute = require('../routes/recipeRoute');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipeRoute);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;