const { byName: getPlayerByName } = require('../handlers/riotPlayer/getPlayer');

module.exports = {
  summoners: [
    {
      url: '/summoner/byName',
      method: 'get',
      handler: getPlayerByName,
    },
  ],
};
