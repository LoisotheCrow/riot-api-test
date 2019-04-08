const express = require('express');
const routeTree = require('../routes');
const authMiddleware = require('../middleware/auth');
const beforeMiddleware = require('../middleware/before');
const errorMiddleware = require('../middleware/error');

const getRouter = () => {
  const router = express.Router({ mergeParams: true });

  const _addMiddleware = () => {
    router.use(beforeMiddleware);
  };

  const _assembleRoutes = routes => {
    routes.forEach(route => {
      const { url, method, handler, noAuth } = route;
      if (noAuth) {
        router[method](url, [handler, errorMiddleware]);
      } else {
        router[method](url, [authMiddleware, handler, errorMiddleware]);
      }
    });
  };

  const _composeRoutes = () => {
    Object.keys(routeTree).forEach(key => {
      _assembleRoutes(routeTree[key]);
    });
  };

  _addMiddleware();
  _composeRoutes();

  return router;
}

module.exports = {
  getRouter,
};
