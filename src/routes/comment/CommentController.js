const express = require('express');
const router = express.Router();
const CommentService = require('./CommentService');
const Board = require('../../models/board');
const Comment = require('../../models/comment');
const ChildComment = require('../../models/childComment');
const common = require('../../common/common');
const util = require('../../util/util');

router.get('/test' , (req , res) => {
    result.code = 'DR00';
    result.message = common.status.DR01;
    result.data = 'asd';
    return res.json(result);
})

router.get('/comments/:boardType/:userEmail' , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    console.log(req.params.id);
    let board = new Board();
    board.comment.userEmail = req.params.userEmail;
    Board.comment.findById(({userEmail:board.userEmail}) , (err , comments) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        result.data.comment = comments;
        Board.childComment.findById({boardId:comment.parentId} , (err , childComments) => {
            if(err){
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);
            }
            result.data.comment.childComment = childComment;
        })
        return res.json(result);
    })
})

router.post('/write' , util.checkBoardId , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.status = common.status.DR00;
    console.log('reqBody' , req.body);
    if(req.body.commentId){
        let childCommnet = new ChildComment();
        childCommnet.userEmail = req.body.userEmail;
        childCommnet.content = req.body.content;
        childCommnet.board = req.body._id;
        childCommnet.boardType = req.body.boardType;
        childCommnet.commentId = req.body.commentId;
        childCommnet.save((err) => {
            if(err){
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);
            }
            return res.json(result);
        })
    }else{
        let comment = new Comment();
        comment.userEmail = req.body.userEmail;
        comment.content = req.body.content;
        comment.board = req.body._id;
        comment.boardType = req.body.boardType;
        console.log('comment', comment);
        comment.save((err) => {
            if(err){
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);    
            }
            return res.json(result);
        })
    }   
})

router.post('/update' , (req , res) => {
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

module.exports = router;
