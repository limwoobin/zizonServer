'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config.json');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error);
db.once('open', function () {
    console.log('Connected to mongod server');
});

var connectUrl = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.dbs;

mongoose.connect(connectUrl);

module.exports = router;