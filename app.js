var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var member = require('./routes/member');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/swagger-ui', express.static(path.join(__dirname, './node_modules/swagger-ui-dist')));
app.use('/swagger.json', function(req, res) {
  res.json(require('./swagger.json'));
});
app.use('/swagger', function (req, res) {
  res.redirect('/swagger-ui?url=/swagger.json');
});

app.use('/member', member);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.send('error');
});

module.exports = app;
