var express = require('express');
var indexRouter = express.Router();
var categoryRouter = require('./category');
var userRouter = require('./user');
let synamicRouter = require('./dynamic')

indexRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/category', categoryRouter);
  app.use('/user', userRouter); app.use('/synamic', synamicRouter);
};
