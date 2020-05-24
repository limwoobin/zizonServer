const express = require('express');
const router = express();
const postService = require('./PostService');
const code = require('../../common/codeInfo');
const Result = require('../../common/result');
const util = require('../../util/util');
const logger = require('../../config/winston');

router.get('/list/:postType' , async (req , res) => {
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    const postType = req.params.postType;
    try{
        const posts = await postService.getPosts(postType);
        result.data = posts;
    }catch(err){
        logger.debug(err.message);
        result.setCode = code.fail.code;
        result.setMessage = code.fail.message;
        result.setData = err.message;
        return res.json(result);
    }
    return res.json(result);
})

router.get('/view/:id' , util.checkPostId , async (req , res) => {
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    const postId = req.params.postId;
    
    try{
        const post = await postService.getPost(postId);
        result.setData = post;
    }catch(err){
        logger.debug(err.message);
        result.setCode = code.fail.code;
        result.setMessage = code.fail.message;
        result.setData = err.message;
        return res.json(result);
    }
    return res.json(result);
})


module.exports = router;