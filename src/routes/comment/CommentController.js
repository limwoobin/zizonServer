const express = require('express');
const router = express.Router();
const Comment = require('../../models/comment');
const common = require('../../common/common');

const {result} = common.result;

router.get('/comments' , (req , res) => {
    
    common.result.code = 'DR00';
    common.result.message = common.status.DR00;
    common.result.data = '좆까세요 이씨발럼아';
    return res.json(common.result);
})

module.exports = router;
