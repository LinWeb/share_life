var db = require('./mongodb/db.js')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
let session = require('express-session')
let MongoStore = require('connect-mongo')(session);
let config = require('./config/index')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
let router = require('./router/index')

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// 设置头部
app.use(function (req, res, next) {
  // let origin = req.headers.origin;
  // let allow_origins = [
  //   'http://localhost:8000',
  //   'http://39.105.228.74:8080',
  // ]
  // if (allow_origins.includes(origin)) {
  //   res.setHeader('Access-Control-Allow-Origin', origin)
  // }
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.setHeader('Access-control-Allow-Methods', '*')
  res.setHeader('Access-control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-control-Allow-Credentials', true)
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

// 登录状态session和cookie验证的原理是：
// 第一次请求登录后生成session，以cookie把加密后的sessionid值发送到客户端并保存下来
// 第二次请求的时候验证请求的cookie值是否跟服务端的session值一致，如果是一致的话说明用户已登录的
// 用户注销的时候删除服务端的session
app.use(session({
  name: 'login_id', // cookie名称，默认'connect.sid'
  secret: 'user_id', // cookie签名标识
  resave: true, // 是否允许重新设置session
  rolling: true, // 是否按照原设定的maxAge值重设session同步到cookie中
  saveUninitialized: false,// 是否设置session在存储容器不给修改，false为允许修改
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: false
  },
  store: new MongoStore({
    url: config.SESSION_DB_URL
  })
}))

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