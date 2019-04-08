const { byName: getPlayerByName } = require('../handlers/riotPlayer/getPlayer');

module.exports = {
  summoners: [
    {
      url: '/byName',
      method: 'get',
      handler: getPlayerByName,
    },
  ],
};
