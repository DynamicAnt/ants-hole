let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// 这里如果用let声明package程序会报错，原因不明
var package = require('./package');
let hbshelper = require('./extend/hbshelper');

let index = require('./routes/index');
let blog = require('./routes/blog');
let monitor = require('./routes/monitor');
let catalog  = require('./routes/admin/catalog');
let blogb  = require('./routes/admin/blog');
let file  = require('./routes/admin/file');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.locals.appName = package.name;
app.locals.appVersion = package.version;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev',{
  skip:function(req,res){
    return req.url.indexOf(".css")!==-1||req.url.indexOf(".js")!==-1;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.set('trust proxy', 'loopback') // specify a single subnet

app.use('/', index);
app.use('/admin/catalog',catalog);
app.use('/admin/blog',blogb);
app.use('/admin/file',file);
app.use('/blog',blog);
app.use('/monitor',monitor);
// app.use(['/monit*r', '/manager'],monitor);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
