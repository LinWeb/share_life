var db = require('./mongodb/db.js')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let router = require('./router/index')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// 设置头部
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE')
  res.setHeader('Access-control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-control-Allow-Credentials', true)
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use([express.static(path.join(__dirname, 'public')), express.static(path.join(__dirname, 'app/build'))]);

router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// let categoryController = require('./controller/category')



module.exports = app;