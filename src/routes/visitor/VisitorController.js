const express = require('express');
const router = express.Router();
const Visitor = require('../../models/visitor');
const common = require('../../common/common');
const util = require('../../util/util');
const moment = require('moment');
const today = moment().format('YYYY-MM-DD');

router.get('/count' , (req , res) => {
    const result = common.result;
    const data = {};
    result.code = 'DR00';
    result.message = common.status.DR00;
    Visitor.find((err , counts) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            return res.json(result);
        }

        data.totalCount = counts.reduce((initialValue , currentVal) => {
            return initialValue + currentVal.todayCount;
        } , 0);

        Visitor.findOne({reqDate:today} , (err , todayData) => {
            if(err){
                result.code = 'DR01';
                result.message = common.status.DR01;
                return res.json(result);
            }
            data.todayCount = todayData.todayCount;
            result.data = data;
            return res.json(result);
        })
    });
})


module.exports = router;