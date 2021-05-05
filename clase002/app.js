const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.sendStatus(404); // 404

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err); // log forever
  res.sendStatus(500);
});

module.exports = app;
