const logger = require('../../../logger');
const requestAPI = require('../API/requestAPI');

const wrapper = async (explain, ...requestParams) => {
  logger.log('API', explain);
  const APIResponse = await requestAPI(...requestParams);
  const { data, status, errMessage } = APIResponse;
  if (status === 1) {
    logger.log('error', `Error in API handler: ${errMessage}.`);
    throw new Error(`Error accessing RIOT API: ${errMessage}`);
  }
  return data;
};

module.exports = wrapper;
