'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var fs = require('fs');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true
}));
app.use(morgan);
app.use(cors());

console.log('Server js !!!');

module.exports = router;