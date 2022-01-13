const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  const db = await connection();
  const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return response;
};

const register = async (newRecipe) => {
  const recipes = await connection().then((db) => db.collection('recipes'));
  const { ops } = await recipes.insertOne({ ...newRecipe });
  return { recipe: ops[0] };
};

const erase = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const update = async (id, userId, newRecipe) => {
  const recipes = await connection().then((db) => db.collection('recipes'));
  await recipes.updateOne({ _id: ObjectId(id) }, { $set: newRecipe });
  const udpatedRecipe = { _id: id, ...newRecipe, userId };
  return udpatedRecipe;
};

module.exports = {
  getAll,
  getById,
  register,
  erase,
  update,
};