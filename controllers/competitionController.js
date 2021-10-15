const competitionService = require('../services/competitionService');

const create = async (req, res) => {
  const { competicao } = req.body;
  const { err, competitionStatus, status } = await competitionService
    .create(competicao);
  if (err) {
  return res.status(err.code).json({ message: err.message }); 
  }
  res.status(status).json({ result: `A ${competicao} foi ${competitionStatus}` });
};

const update = async (req, res) => {
  const { competicao } = req.body;
  const { status, updatedSituation } = await competitionService
    .update(competicao);
  res.status(status).json({ result: `A ${competicao} foi ${updatedSituation}` });
};

const getAll = async (_req, res) => {
  const { status, recipesList } = await competitionService.getAll();
  res.status(status).json(recipesList);
};

module.exports = {
  create,
  update,
  getAll,
};
