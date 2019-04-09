const isEmpty = require('lodash/isEmpty');
const wrapper = require('../API/wrapper');

const _buildParams = data => {
  const params = {};
  if (isEmpty(data)) {
    return [];
  }
  const { summonerId, ...rest } = data;
  Object.keys(rest).forEach(key => {
    if (data[key]) {
      params[key] = data[key];
    }
  });
  return ['get', params];
};

const getHistoryById = async data => wrapper(
  `Calling match history by summonerId ${data.summonerId}.`,
  `match/v4/matchlists/by-account/${data.summonerId}`,
  ..._buildParams(data),
);

module.exports = getHistoryById;