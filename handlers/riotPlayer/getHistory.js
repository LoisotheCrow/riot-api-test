const { defaultSeason, defaultQueue } = require('../../configs/APIConfig');
const buildResponse = require('../../utils/buildRes');
const getHistoryById = require('../../RiotAPI/v4/match/historyById');

const _validateBoundaries = ({ startIndex, endIndex, startTime, endTime }) => {
  if (!startTime && !endTime) {
    if (!startIndex && !endIndex) {
      return true;
    } else {
      if (startIndex > endIndex) {
        return false;
      }
      return !(endIndex - startIndex > 100);
    }
  } else {
    if (startTime > endTime) {
      return false;
    }
    return !(endTime && (endTime - startTime >= 604800000));
  }
};

const bySummonerId = async (req, res, next) => {
  const {
    query: {
      summonerId, startIndex, endIndex, startTime, endTime,
      queue = defaultQueue, champion, season = defaultSeason,
    },
    res: { customError },
  } = req;
  if (customError) {
    next();
    return;
  }
  if (!summonerId) {
    res.customError = { code: 400, message: 'Missing parameter summonerId.' };
    next();
    return;
  }
  const boundaries = { startIndex, startTime, endIndex, endTime };
  const validBoundaries = _validateBoundaries(boundaries);
  if (!validBoundaries) {
    res.customError = { code: 400, message: 'Invalid boundaries.' };
    next();
    return;
  }
  const params = { summonerId, queue, season };
  Object.keys(boundaries).forEach(key => {
    params[key] = boundaries[key];
  });
  if (champion) {
    params.champion = champion;
  }
  try {
    const matchHistory = await getHistoryById(params);
    if (matchHistory) {
      res.status(200).json(buildResponse(matchHistory));
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
  bySummonerId,
};

