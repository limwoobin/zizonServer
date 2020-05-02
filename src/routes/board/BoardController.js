const express = require('express');
const router = express.Router();
const BoardService = require('./BoardService');
const Board = require('../../models/board');
const Comment = require('../../models/comment');
const ChildComment = require('../../models/childComment');
const common = require('../../common/common');
const util = require('../../util/util');


router.post('/test' , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    let board = new Board();
    board = req.body;
    Board.findOneAndUpdate(({id:board.id , userEmail:board.userEmail}) , ({content:board.content}) , {new:true} , (err , data) => {
        if(err){
            console.log(err);
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = status(500).json({err});
            return res.json(result);
        }
        console.log(data);
        result.data = data;
        return res.json(result);
    })
})


router.get('/list' , async (req , res) => {
    // 예시코드  
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    try{
        const boards = await BoardService.getBoardList();
        result.data = boards;
    }catch(err){
        result.code = 'DR00';
        result.message = common.status.DR00;
        result.data = err;
        return res.json(result);
    }
    return res.json(result);
});

router.get('/view/:id' , util.checkBoardId , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    const _id = req.params.id;
    Board.findOne({_id:_id} , (err , boardData) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        boardData.views++;
        boardData.save();
        Comment.find({board:_id} , (err , comments) => {
            if(err){
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);
            }

            setChildComments(comments);  
            function setChildValue(c){
                return new Promise((resolve , reject) => {
                    ChildComment.find({commentId:c._id} , (err , childComments) => {
                        if(childComments.length !== 0){
                            c.childComments = childComments;
                        }
                        resolve();
                    })
                })
            }   

            async function setChildComments(comments){
                for(let c in comments){
                    await setChildValue(comments[c]);
                }
                boardData.comments = comments; 
                result.data = boardData;
                return res.json(result);  
            }     
        })
    })
})

router.post('/write' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    let board = new Board();
    board.boardType = req.body.boardType;
    board.userEmail = req.body.userEmail;
    board.title = req.body.title;
    board.content = req.body.content;
    board.image = req.body.image;

    try{
        const writeBoard = await BoardService.writeBoard(board);
        if(writeBoard !== 'DR00'){
            result.code = 'DR01';
            result.message = common.status.DR01;
            return res.json(result);
        }
    }catch(err){
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = err;
        return res.json(result);
    }
    return res.json(result);
});

router.post('/update' , async (req , res) => {
    let board = new Board();
    board = req.body;
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    try{
        const updateBoard = await BoardService.updateBoard(board);
        result.data = updateBoard;
    }catch(err) {
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = err;
        return res.json(result);
    }
    return res.json(result);
});

router.delete('/delete' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    let board = new Board();
    board = req.body;
    try{
        const deleteBoard = await BoardService.deleteBoard(board);
        result.data = deleteBoard;
    }catch(err) {
        console.log('err' , err);
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = err;
        return res.json(result);
    }
    return res.json(result);
});


module.exports = router;
