const { byName: getPlayerByName } = require('../handlers/riotPlayer/getPlayer');
const { bySummonerId: getHistoryById } = require('../handlers/riotPlayer/getHistory');

module.exports = {
  summoners: [
    { url: 'byName', handler: getPlayerByName },
  ],
  history: [
    { url: 'byId', handler: getHistoryById },
  ],
};
