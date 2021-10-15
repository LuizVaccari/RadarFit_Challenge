const { ObjectID } = require('bson');
const connection = require('./connection');

const create = async (competicao, atleta, value, unidade) => {
  const db = await connection();
  const insertedResult = await db.collection(competicao)
    .insertOne({ competicao, atleta, value, unidade });  
  const result = await db.collection(competicao)
    .findOne({ _id: ObjectID(insertedResult.insertedId) });
  console.log(result);
  return result; 
};

const getRank = async (competicao) => {
  const db = await connection();
  return db.collection(competicao).find().toArray();
};

module.exports = {
  create,
  getRank
};