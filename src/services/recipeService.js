const recipeModel = require('../models/recipeModel');

const error = { code: 401, message: 'missing auth token' };

const getAll = async () => {
  const response = await recipeModel.getAll();
  return response;
};

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  if (!recipe) return { code: 404, message: 'recipe not found' };
  return { recipe };
};

const register = async (newRecipe) => {
  const { recipe } = await recipeModel.register(newRecipe);
  return recipe;
};

const erase = async (recipeId, userId, role) => {
  const recipe = await recipeModel.getById(recipeId);
  if (!recipe) return error;
  if (recipe.userId.toString() !== userId.toString() && role === 'user') return error;
  await recipeModel.erase(recipeId);
};

const update = async (recipeId, user, newRecipe) => {
  const { _id: userId, role } = user;
  const oldRecipe = await recipeModel.getById(recipeId);
  if (!oldRecipe) return error;
  if (oldRecipe.userId.toString() !== userId.toString() && role === 'user') return error;
  const recipe = await recipeModel.update(recipeId, userId, newRecipe);
  return { recipe };  
};

module.exports = {
  getAll,
  getById,
  register,
  erase,
  update,
};