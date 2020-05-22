const express = require('express');
const router = express();
const PostService = require('./PostService');
const Post = require('../../models/post');
const common = require('../../common/common');
const util = require('../../util/util');

router.get('/list/:postType' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    res.json(result);
})

router.get('/list/:postId' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    res.json(result);
})

module.exports = router;