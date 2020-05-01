var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var multer = require('multer');
var mongoose = require('mongoose');

var session = require('express-session')

global.dbhandle = require('./database/dbhandle');

global.db = mongoose.connect("mongodb://localhost:27017/db", {

  // mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").__express);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({ dest: __dirname + '/database' }).any());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', indexRouter); 
app.use('/register', indexRouter); 
app.use('/home', indexRouter);

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

app.use(function (req, res, next) {
  res.locals.user = req.session.user;   // 从session 获取 user对象
  var err = req.session.error;   //获取错误信息
  delete req.session.error;
  res.locals.message = "";   // 展示的信息 message
  if (err) {
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' + err + '</div>';
  }
  next();  //中间件传递
});

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






module.exports = app;
