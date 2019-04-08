const logger = require('../../logger');
const buildResponse = require('../../utils/resFromMsg');

const handleError = (req, res) => {
  const { customError } = res;
  if (!customError) {
    return;
  }
  const { code, message } = customError;
  logger.log('error', `Responding with error: code ${code} and message '${message}'.`);
  res.status(code).json(buildResponse(message, true));
};

module.exports = handleError;
