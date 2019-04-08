const logger = require('../../../logger');
const requestAPI = require('../API/requestAPI');

const getSummonerByName = async name => {
  logger.log('API', `Calling summoner by name ${name}.`);
  const APIResponse = await requestAPI(`summoner/v4/summoners/by-name/${name}`);
  const { data, status, errMessage } = APIResponse;
  if (status === 1) {
    logger.log('error', `Error in API handler: ${errMessage}.`);
    throw new Error(`Error accessing RIOT API: ${errMessage}`);
  }
  return data;
};

module.exports = getSummonerByName;
