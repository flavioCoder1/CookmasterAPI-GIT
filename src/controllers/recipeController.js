const path = require('path');
const recipeService = require('../services/recipeService');

const getAll = async (_req, res) => {
  const recipes = await recipeService.getAll();
  res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, message, recipe } = await recipeService.getById(id);
  if (code) return res.status(code).json({ message });
  res.status(200).json(recipe);
};

const register = async (req, res) => {
  const newRecipe = req.body;
  const { _id: userId } = req.user;
  const recipe = await recipeService.register({ ...newRecipe, userId });
  res.status(201).json({ recipe });
};

const erase = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;
  const response = await recipeService.erase(id, userId, role);
  if (response) {
    const { code, message } = response;
    return res.status(code).json({ message });
  }
  res.status(204).json();
};

const update = async (req, res) => {
  const { id } = req.params;
  const newRecipe = req.body;
  const { code, message, recipe } = await recipeService.update(id, req.user, newRecipe);
  if (code) return res.status(code).json({ message });
  res.status(200).json(recipe);
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const image = path.join('localhost:3000', 'src', 'uploads', req.file.filename);
  const { code, message } = await recipeService.update(id, req.user, { image });
  if (code) return res.status(code).json({ message });
  const { recipe } = await recipeService.getById(id);
  res.status(200).json(recipe);
};

module.exports = {
  getAll,
  getById,
  register,
  uploadImage,
  erase,
  update,
};