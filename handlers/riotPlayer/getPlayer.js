const buildResponse = require('../../utils/buildRes');
const getSummonerByName = require('../../RiotAPI/v4/summoner/byName');

const byName = async (req, res, next) => {
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
    const summonerInfo = await getSummonerByName(name);
    if (summonerInfo) {
      res.status(200).json(buildResponse(summonerInfo));
    } else {
      res.customError = { code: 500, message: 'Error accessing RIOT API.' };
      next();
    }
  } catch (err) {
    res.customError = { code: 500, message: 'Error accessing RIOT API.' };
    next();
  }
};

module.exports = {
  byName,
};
