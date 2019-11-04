/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * fort number is 3000
 * http://(ipaddress):3000/
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var employerJoinRouter = require('./routes/Employer/Join');
var employerLoginRouter = require('./routes/Employer/Login');
var employerJobOfferRouter = require('./routes/Employer/JobOffer');
var employerMatchedJobRouter = require('./routes/Employer/MatchedJob');
var employerPay = require('./routes/Employer/PayEmployer');

var employeeJoinRouter = require('./routes/Employee/Join');
var employeeLoginRouter = require('./routes/Employee/Login');
var employeeJobSearchRouter = require('./routes/Employee/JobSearch');
var employeeCareerLookup = require('./routes/Employee/CareerLookup');
var employeeMatchedJob = require('./routes/Employee/MatchedJob');
var employeePay = require('./routes/Employee/PayEmployee');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/employerjoin', employerJoinRouter);
app.use('/employerlogin',employerLoginRouter);
app.use('/employerjoboffer',employerJobOfferRouter);
app.use('/employermatchedjob',employerMatchedJobRouter);
app.use('/employerpay',employerPay);

app.use('/employeejoin',employeeJoinRouter);
app.use('/employeelogin',employeeLoginRouter);
app.use('/employeejobsearch',employeeJobSearchRouter);
app.use('/employeecareerlookup',employeeCareerLookup);
app.use('/employeematchedjob',employeeMatchedJob);
app.use('/employeepay',employeePay);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
