const express = require('express');
const router = express();
const postService = require('./PostService');
const Post = require('../../models/post');
const common = require('../../common/common');
const Result = require('../../common/result');
const util = require('../../util/util');

router.get('/list/:postType' , async (req , res) => {
    const result = new Result();
    result.setCode = 'DR00';
    result.setMessage = 'asdasd';

    return res.json(result);
})

router.get('/list/:postId' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    res.json(result);
})

module.exports = router;