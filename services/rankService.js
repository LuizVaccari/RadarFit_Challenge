const rankModel = require('../models/rankModel');
const competitionModel = require('../models/competitionModel');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const validateEntry = (competicao, atleta, value, unidade) => {
  const invalidEntriesError = { err: { code: 400, message: 'Invalid entry. Try again.' } };
  if (!competicao || !atleta || !value || !unidade) {
  return invalidEntriesError;
}
  return null;
};

const create = async (competicao, atleta, value, unidade) => {
  const invalidEntry = validateEntry(competicao, atleta, value, unidade);
  if (invalidEntry) return invalidEntry;

  const finishedCompetitionError = { err: { code: 400, message: 'Competição finalizada.' } };
  const checkStatus = await competitionModel.checkStatus(competicao);
  if(checkStatus === 'finalizada') return finishedCompetitionError;

  const insertedCompetition = await rankModel.create(competicao, atleta, value, unidade);
  return { competitionStatus: insertedCompetition, status: HTTP_CREATED_STATUS };
};

const getRank = async (competicao) => {
  const results = await rankModel.getRank(competicao);

  const filteredRank = await results.filter((result) => !result.status);

  const standardizedResult = await filteredRank.map((result) => { 
    if (result.unidade === 'ml') return { ...result, value: result.value/1000, unidade: 'l' };
    if (result.unidade === 'm') return { ...result, value: result.value*60, unidade: 's' };
    return { ...result, value: Number(result.value) }
  });

  const orderedRank = standardizedResult.sort((a,b) => {
  return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
  });

  return { rank: orderedRank, status: HTTP_OK_STATUS }; 
};


module.exports = {
  create,
  getRank,
};
