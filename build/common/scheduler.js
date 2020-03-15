'use strict';

var express = require('express');
var app = express();
var cron = require('node-cron');

cron.schedule('0 0 * * *', function (req, res) {
    req.session.destroy(function (err) {
        console.error(err);
    });
});