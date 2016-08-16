var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var provider = require('./routes/provider');
var dbConn = require('./routes/dbConn');
var SearchResults = require('./routes/SearchResults');
var providersearch = require('./routes/providersearch');
var providerdetails = require('./routes/providerdetails');
var appointmentdetails = require('./routes/appointmentdetails');
var sendemail = require('./routes/sendemail');
var team =  require ('./routes/team');

var app = express();

//Global Variables

//app.locals.dbURL = 'mongodb://localhost:27017/CareDB';
app.locals.dbURL = 'mongodb://syedr:deClub60@ds153745.mlab.com:53745/heroku_ks5550z8';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/provider', provider);
app.use('/dbConn', dbConn);
app.use('/SearchResults', SearchResults);
app.use('/providersearch', providersearch);
app.use('/providerdetails', providerdetails);
app.use('/appointmentdetails', appointmentdetails);
app.use('/sendemail', sendemail);
app.use('/team', team);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
