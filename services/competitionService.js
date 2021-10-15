const competitionModel = require('../models/competitionModel');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const validateEntry = (competicao) => {
  const invalidEntriesError = { err: { code: 400, message: 'Invalid entry. Try again.' } };
  if (!competicao) {
  return invalidEntriesError;
}
  return null;
};

const create = async (competicao) => {
  const invalidEntry = validateEntry(competicao);
  if (invalidEntry) return invalidEntry;
  const insertedCompetition = await competitionModel.create(competicao);
  return { competitionStatus: insertedCompetition, status: HTTP_CREATED_STATUS };
};

const update = async (competicao) => {
  const situation = await competitionModel.update(competicao);
  return { updatedSituation: situation, status: HTTP_OK_STATUS };
};


module.exports = {
  create,
  update
};