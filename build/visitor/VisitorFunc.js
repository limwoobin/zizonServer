'use strict';

var express = require('express');
var app = express();
var Visitor = require('../models/visitor');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var session = require('express-session');
app.use(session({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true
}));

var visitorCount = function visitorCount(req) {
    var getIp = require('../common/config').getIpAddressFromRequest(req);
    console.log('sessionIp:' + session.getIp);
    console.log('ip -> ' + getIp);
    if (session.getIp) {
        return;
    }
    console.log('session2');
    session.getIp = getIp;
    var reqDate = moment().format('YYYY-MM-DD');
    // let visitor = new Visitor();
    Visitor.findOne({ reqDate: reqDate }, function (err, visitor) {
        if (err) {
            console.error('error:' + err);
            throw err;
        }
        if (!visitor) {
            // insert
            console.log(reqDate);
            console.log('insert');
            var _visitor = new Visitor();
            _visitor.reqDate = reqDate;
            _visitor.save(function (err) {
                if (err) {
                    console.error(err);
                    throw err;
                }
            });
        } else {
            // update
            console.log('update');
            Visitor.updateOne({ reqDate: reqDate }, { $inc: { todayCount: 1 } }, function (err, visitor) {
                if (err) {
                    console.error(err);
                    throw err;
                }
            });
        }
    });
    return 'Success';
};

module.exports.visitorCount = visitorCount;