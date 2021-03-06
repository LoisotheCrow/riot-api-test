const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('../logger');
const routerProvider = require('./router');

const getApplication = () => {
  const app = express();

  const _addParsers = () => {
    app.use(bodyParser.json({limit: '50mb', extended: true}));
    app.use(cookieParser());
  };

  const _connectRoutes = () => {
    const router = routerProvider.getRouter();
    app.use(router);
  };

  const _add404Handler = () => {
    const handle404 = (req, res) => {
      logger.log('error', `Got 404 request for ${req.url}.`);
      res.status(404).send('Not found.');
    };
    app.use(handle404);
  };

  const _addIndex = () => {
    app.get('/', (req, res) => {
      res.status(200).send('up');
    });
  }

  _addParsers();
  _connectRoutes();
  _add404Handler();
  _addIndex();

  return app;
};

module.exports = {
  getApp: getApplication,
};
