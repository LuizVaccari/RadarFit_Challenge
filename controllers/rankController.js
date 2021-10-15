const rankService = require('../services/rankService');

const create = async (req, res) => {
  const { competicao, atleta, value, unidade } = req.body;
  const { err, competitionStatus, status } = await rankService
    .create(competicao, atleta, value, unidade);
  if (err) {
  return res.status(err.code).json({ message: err.message }); 
  }
  res.status(status).json({ result: competitionStatus });
};

const getRank = async (req, res) => {
  const { competicao } = req.body;
  const { status, rank } = await rankService.getRank(competicao);
  res.status(status).json(rank);
};

module.exports = {
  create,
  getRank
};
