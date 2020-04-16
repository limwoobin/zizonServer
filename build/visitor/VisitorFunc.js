'use strict';

var Visitor = require('../models/visitor');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

function VisitorFunc() {}

VisitorFunc.prototype.visitorCount = function (req, res, next) {
    var rs = req.session;
    var getIp = require('../common/config').getIpAddressFromRequest(req);
    console.log('rs.getIp', rs.getIp);
    if (!rs.getIp) {
        rs.getIp = getIp;
        var reqDate = moment().format('YYYY-MM-DD');
        Visitor.findOne({ reqDate: reqDate }, function (err, visitorData) {
            if (err) {
                console.log('err', err);
                throw err;
            }
            if (!visitorData) {
                var _visitor = new Visitor();
                _visitor.todayCount++;
                _visitor.reqDate = reqDate;
                _visitor.save();
            } else {
                visitorData.todayCount++;
                visitorData.reqDate = reqDate;
                visitorData.save();
            }
        });
    }
    next();
};

var visitor = new VisitorFunc();

module.exports = visitor;