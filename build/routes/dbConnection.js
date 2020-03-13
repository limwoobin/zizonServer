'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('Connected to mongod server');
});

mongoose.connect('mongodb://127.0.0.1:27017/mongodb_tutorial');

module.exports = router;