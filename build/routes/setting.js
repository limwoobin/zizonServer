'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var db = require('./dbConnection');

app.use(db);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan);
app.use(cors());

console.log('Server js !!!');

module.exports = router;