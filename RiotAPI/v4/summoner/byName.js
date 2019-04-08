const wrapper = require('../API/wrapper');

const getSummonerByName = async name => wrapper(
  `Calling summoner by name ${name}.`,
  `summoner/v4/summoners/by-name/${name}`,
);

module.exports = getSummonerByName;
