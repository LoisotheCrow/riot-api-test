const logger = require('../../../logger');
const config = require('../../../configs/APIConfig');

const { APIKey, region } = config;

const getSummonerByName = name => {
  logger.log('API', 'Calling summoner by name.');
};

module.exports = getSummonerByName;
