const logger = require('../../logger');
const buildResponse = require('../../utils/resFromMsg');

const handleError = (req, res, next) => {
  const { customError } = res;
  if (!customError) {
    next();
    return;
  }
  const { code, message } = customError;
  logger.log('error', `Responding with error: code ${code} and message '${message}'.`);
  res.status(code).json(buildResponse(message, true));
};

module.exports = handleError;
