const logger = require('../../logger');

module.exports = (req, res, next) => {
  const { url } = req;
  logger.log('connection', `Got connection on ${url}.`);
  next();
};
