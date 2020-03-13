'use strict';

var express = require('express');
var router = express.Router();
var Category = require('../../models/category');
var common = require('../../common/common');

router.get('/list', function (req, res) {
    Category.find(function (err, categories) {
        if (err) {
            common.result.code = 'DR01';
            common.result.message = common.status.DR00;
            return res.json(common.result);
        }

        common.result.code = 'DR00';
        common.result.message = common.status.DR00;
        common.result.data = categories;
        return res.json(common.result);
    });
});

module.exports = router;