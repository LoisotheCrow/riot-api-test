const axios = require('axios');
const isEmpty = require('lodash/isEmpty');
const config = require('../../../configs/APIConfig');

const { entryPoint, region, APIKey } = config;
const baseUrl = `https://${region}.${entryPoint}`;

const requestAPI = async (url, method, requestData) => {
  const _buildAPIResponse = (data, isErr = false, errMessage) => ({
    status: isErr ? 1 : 0,
    data,
    errMessage
  });

  const _buildUrl = () => `${baseUrl}/${url}?api_key=${APIKey}`;

  const _getFromAPI = async () => {
    const requestConfig = {
      method: 'get',
      url: _buildUrl(),
    };
    if (requestData && !isEmpty(requestData)) {
      requestConfig.data = requestData;
    }
    return axios(requestConfig);
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
