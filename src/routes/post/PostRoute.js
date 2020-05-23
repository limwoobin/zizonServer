const express = require('express');
const router = express();
const postService = require('./PostService');
const Post = require('../../models/post');
const code = require('../../common/codeInfo');
const Result = require('../../common/result');
const util = require('../../util/util');

router.get('/list/:postType' , async (req , res) => {
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;

    const postType = req.params.postType;
    try{
        const posts = postService.getPosts(postType);
        result.data = posts;
    }catch(err){
        result.setCode = code.fail.code;
        result.setMessage = code.fail.message;
        return res.json(result);
    }
    return res.json(result);
})

router.get('/list/:postId' , async (req , res) => {
    const result = new Result();
    result.setCode = 'DR00';
    result.setMessage = 'asdasd';

    res.json(result);
})

module.exports = router;