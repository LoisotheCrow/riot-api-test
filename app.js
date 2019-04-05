const http = require('http');
const logger = require('./logger');

try {
  const { getApp } = require('./express/application');

  const app = getApp();
  const server = http.createServer(app);

  const _getBind = () => {
    const address = server.address();
    const isPipe = typeof address === 'string';
    return isPipe ? `Pipe ${address}` : `Port ${address.port}`;
  };

  const _getEntry = () => {
    return {
      host: 'localhost',
      port: 8000,
    };
  };

  const _handleError = ({ syscall, code, message }) => {
    logger.log('error', 'Server error, info below:');
    const { exit } = process;
    const bind = _getBind();
    if (syscall !== 'listen') {
      logger.log('error', `Unexpected syscall handle: expected - [listen], got - [${syscall}]`);
      exit(1);
    }
    switch (code) {
      case 'EACCES':
        logger.log('error', `${bind} requires elevated privileges!`);
        exit(1);
        break;
      case 'EADDRINUSE':
        logger.log('error', `${bind} is already in use!`);
        exit(1);
        break;
      case 'ELIFECYCLE':
        logger.log('error', `Lifecycle error: ${message}`);
        exit(1);
        break;
      default:
        logger.log('error', `Unexpected error code: expected - oneof[EACCESS, EADDRINUSE, ELIFECYCLE], got - [${code}]`);
        exit(1);
    }
  };

  const _logListen = () => {
    const bind = _getBind();
    logger.log('info', `Listening on ${bind}.`);
  };

  const _connect = () => {
    const { host, port } = _getEntry();
    server.on('error', _handleError);
    server.on('listening', _logListen);
    server.listen(port, host);
  };

  _connect();
} catch (err) {
  logger.log('error', err.message);
}