const validateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateRecipeId = (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) return res.status(404).json({ message: 'recipe not found' });
  next();
};

module.exports = {
  validateRecipe,
  validateRecipeId, 
};