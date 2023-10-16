require("dotenv").config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var fullfillmentRouter = require('./routes/fullfillment');
var webhookRouter = require('./routes/webhook');

var app = express();
const cors = require("cors") ;
app.use(cors()) ;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',indexRouter);
app.use('/fullfillment', fullfillmentRouter);
app.use('/webhook', webhookRouter);
module.exports = app;
