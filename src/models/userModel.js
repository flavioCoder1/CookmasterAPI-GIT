const { connection } = require('./connection');

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

const getByEmail = async (email) => {
  const db = await connection();
  const response = await db.collection('users').findOne({ email });
  return response;
};

const create = async (name, email, nPassword, role) => {
  const users = await connection().then((db) => db.collection('users'));
  const { ops } = await users.insertOne({ name, email, password: nPassword, role });
  const { password, ...userWithouthPassword } = ops[0];
  return { user: userWithouthPassword };
};

module.exports = {
  getAll,
  getByEmail,
  create,
};