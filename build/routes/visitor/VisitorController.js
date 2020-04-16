'use strict';

var express = require('express');
var router = express.Router();
var Visitor = require('../../models/visitor');
var common = require('../../common/common');
var util = require('../../util/util');
var moment = require('moment');
var today = moment().format('YYYY-MM-DD');

router.get('/count', function (req, res) {
    var result = common.result;
    var data = {};
    result.code = 'DR00';
    result.message = common.status.DR00;
    Visitor.find(function (err, counts) {
        if (err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            return res.json(result);
        }

        data.totalCount = counts.reduce(function (initialValue, currentVal) {
            return initialValue + currentVal.todayCount;
        }, 0);

        Visitor.findOne({ reqDate: today }, function (err, todayData) {
            if (err) {
                result.code = 'DR01';
                result.message = common.status.DR01;
                return res.json(result);
            }
            data.todayCount = todayData.todayCount;
            result.data = data;
            return res.json(result);
        });
    });
});

module.exports = router;