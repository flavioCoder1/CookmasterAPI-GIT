const router = require('express').Router();
const recipeController = require('../controllers/recipeController');
const upload = require('../middlewares/upload');
const { validateToken, validateTokenRecipe } = require('../middlewares/validateToken');
const { validateRecipe, validateRecipeId } = require('../middlewares/validationsRecipe');

router.get('/', recipeController.getAll);
router.post('/', validateToken, validateRecipe, recipeController.register);
router.get('/:id', validateRecipeId, recipeController.getById);
router.delete('/:id', validateTokenRecipe, recipeController.erase);
router.put('/:id/image', validateTokenRecipe, upload.single('image'), recipeController.uploadImage);
router.put('/:id', validateTokenRecipe, recipeController.update);

module.exports = router;