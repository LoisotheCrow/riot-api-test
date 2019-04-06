const logger = require('../../logger');
const getSummonerByName = require('../../RiotAPI/v4/summoner/byName');

const getUser = (req, res, next) => {
  const { query: { name }, res: { customError } } = req;
  if (customError) {
    next();
    return;
  }
  if (!name) {
    res.customError = { code: 400, message: 'Missing parameter name.' };
    next();
    return;
  }
  try {
    const summonerInfo = getSummonerByName(name);
  } catch (err) {
    res.customError = { code: 500, message: 'Error accessing RIOT API.' };
    next();
  }
};
