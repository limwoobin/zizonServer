const express = require('express');
const router = express.Router();
const Board = require('../../models/board');
const common = require('../../common/common');

const result = common.result;

router.get('/test' , (req , res) => {
    result.code = 'DR00';
    result.message = common.status.DR01;
    result.data = 'asd';
    return res.json(result);
})

router.get('/comments/:boardType/:userEmail' , (req , res) => {
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

router.post('/add' , (req , res) => {
    result.code = 'DR00';
    result.status = common.status.DR00;
    let board = new Board();
    board = req.body.id;
    board.save({id:board.id , comment:req.body.comment} , (req , res) => {

    })
})

router.post('/update' , (req , res) => {
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
