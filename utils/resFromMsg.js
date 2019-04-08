const buildRes = require('./buildRes');

module.exports = (msg, isErr = false) => buildRes({ message: msg }, isErr);
