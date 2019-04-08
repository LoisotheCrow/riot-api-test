const buildResponse = require('../../utils/buildRes');
const getHistoryById = require('../../RiotAPI/v4/match/historyById');

const _validateBoundaries = ({ startI, endI, startT, endT }) => {
  if (!startT && !endT) {
    if (!startI && !endI) {
      return true;
    } else {
      if (startI > endI) {
        return false;
      }
      return !(endI - startI > 100);
    }
  } else {
    if (startT > endT) {
      return false;
    }
    return !(endT && (endT - startT >= 604800000));
  }
};

const bySummonerId = async (req, res, next) => {
  const { query: { summonerId, startI, endI, startT, endT }, res: { customError } } = req;
  if (customError) {
    next();
    return;
  }
  if (!summonerId) {
    res.customError = { code: 400, message: 'Missing parameter summonerId.' };
    next();
    return;
  }
  const boundaries = { startI, startT, endI, endT };
  const validBoundaries = _validateBoundaries(boundaries);
  if (!validBoundaries) {
    res.customError = { code: 400, message: 'Invalid boundaries.' };
    next();
    return;
  }
  const params = { summonerId };
  Object.keys(boundaries).forEach(key => {
    params[key] = boundaries[key];
  })
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

