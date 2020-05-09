const express = require('express');
const router = express.Router();
const CommentService = require('./CommentService');
const Board = require('../../models/board');
const Comment = require('../../models/comment');
const ChildComment = require('../../models/childComment');
const common = require('../../common/common');
const util = require('../../util/util');

router.get('/test' , async (req , res) => {
    result.code = 'DR00';
    result.message = common.status.DR01;
    result.data = 'asd';
    return res.json(result);
})

router.get('/comments/:boardType/:userEmail' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    console.log(req.params.id);
    try{
        const getSelfComments = CommentService.getSelfComments(req.params.userEmail);
        result.data = getSelfComments;
    }catch(err){
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = err;
        return res.json(result);
    }
    return res.json(result);
})

router.post('/write' , util.checkBoardId , async (req , res) => {
    console.log(req.body);
    const result = common.result;
    result.code = 'DR00';
    result.status = common.status.DR00;
    try{
        const writeComment = await CommentService.writeComment(req.body);
        console.log('writeComment' , writeComment);
    }catch(err){
        console.log(err);
        result.code = 'DR01';
        result.status = common.status.DR01;
        result.data = err;
        return res.json(result);
    }
    return res.json(result); 
})

router.post('/update' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    let board = new Board();
    board = req.body;
    Board.findOneAndUpdate(
        {
            userEmail: board.userEmail,
            id: board.id,
            comment : board.comment
        } , 
        {
            comment : board.comment,
        } , {new:true}, (err , comment) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }

        result.data = comment;
        return res.json(result);
    })
})

router.get('/list/:id' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;    
    console.log(req.params.id);

    try{
        const comments = await CommentService.getComments(req.params.id);
        result.data = comments;
    }catch(err){
        result.code = 'DR00';
        result.message = common.status.DR00;    
        result.data = err;
        return res.json(result);
    }

    return res.json(result);
})

module.exports = router;
