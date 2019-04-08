const wrapper = require('../API/wrapper');

const getHistoryById = async id => wrapper(
  `Calling match history by summonerId ${id}.`,
  `match/v4/matchlists/by-account/${id}`,
);

module.exports = getHistoryById;