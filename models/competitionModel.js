const connection = require('./connection');

const create = async (competicao) => {
  const db = await connection();
  await db.collection(competicao)
    .insertOne({ status: 'criada' });
  const competition = await db.collection(competicao)
    .findOne({ status: 'criada' });
  console.log(competition);
  return competition.status;
  
};

const update = async (competicao) => {
  const db = await connection();
  await db.collection(competicao)
    .updateOne({ status: 'criada' }, { $set: { status: 'finalizada' } });
  const competition = await db.collection(competicao)
    .findOne({ status: 'finalizada' });
  console.log(competition)
  return competition.status;
};

module.exports = {
  create,
  update
};