const express = require('express');
const logger = require('../logger');
const routeTree = require('../routes');
const authMiddleware = require('../middleware/auth');
const beforeMiddleware = require('../middleware/before');
const errorMiddleware = require('../middleware/error');

const getRouter = () => {
  const router = express.Router({ mergeParams: true });

  const _addMiddleware = () => {
    router.use(beforeMiddleware);
  };

  const _addErrorHandler = () => {
    router.use(errorMiddleware);
  };

  const _assembleRoutes = (routes, appendix) => {
    routes.forEach(route => {
      const { url, method = 'get', handler, auth } = route;
      const fullUrl = `/${appendix}/url`;
      if (!auth) {
        router[method](fullUrl, [handler]);
      } else {
        router[method](fullUrl, [authMiddleware, handler]);
      }
    });
  };

  const _composeRoutes = () => {
    Object.keys(routeTree).forEach(key => {
      logger.log('build', `Assembling route structure for ${key}.`);
      _assembleRoutes(routeTree[key], key);
    });
  };

  _addMiddleware();
  _composeRoutes();
  _addErrorHandler();

  return router;
}

module.exports = {
  getRouter,
};
