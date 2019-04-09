const axios = require('axios');
const logger = require('../../../logger');
const isEmpty = require('lodash/isEmpty');
const config = require('../../../configs/APIConfig');

const { entryPoint, region, APIKey } = config;
const baseUrl = `https://${region}.${entryPoint}`;

const requestAPI = async (url, method = 'get', requestData) => {
  const gotData = requestData && !isEmpty(requestData);

  if (gotData) {
    logger.log('API', `Prepared request data: ${JSON.stringify(requestData)}`);
  }

  const _buildAPIResponse = (data, isErr = false, errMessage) => ({
    status: isErr ? 1 : 0,
    data,
    errMessage
  });

  const _buildUrl = () => `${baseUrl}/${url}${method !== 'get' ? `?api_key=${APIKey}` : ''}`;

  const _getFromAPI = async () => {
    const requestConfig = {
      method: 'get',
      url: _buildUrl(),
      params: { api_key: APIKey },
    };
    if (gotData) {
      requestConfig.params = { ...requestData, ...requestConfig.params };
    }
    const { data } = await axios(requestConfig);
    logger.log('API', `Got API response: ${JSON.stringify(data)}`);
    return data;
  };

  if (method === 'get') {
    try {
      return _buildAPIResponse(_getFromAPI());
    } catch (err) {
      return _buildAPIResponse({}, true, err.message);
    }
  }
};

module.exports = requestAPI;
