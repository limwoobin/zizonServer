const express = require('express');
const router = express.Router();
const BoardService = require('./BoardService');
const Board = require('../../models/board');
const common = require('../../common/common');
const util = require('../../util/util');
const Result = require('../../common/result');
const code = require('../../common/codeInfo');

router.post('/test' , (req , res) => {
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    let board = new Board();
    board = req.body;
    Board.findOneAndUpdate(({id:board.id , userEmail:board.userEmail}) , ({content:board.content}) , {new:true} , (err , data) => {
        if(err){
            console.log(err);
            result.code = code.fail.code;
            result.message = code.fail.message;
            result.data = status(500).json({err});
            return res.json(result);
        }
        console.log(data);
        result.data = data;
        return res.json(result);
    })
})

router.get('/list/:type' , async (req , res) => {
    // 예시코드  
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    const boardType = req.params.type;
    try{
        const boards = await BoardService.getBoardList(boardType);
        result.data = boards;
    }catch(err){
        result.code = code.fail.code;
        result.message = code.fail.message;
        result.data = err.message;
        return res.json(result);
    }
    return res.json(result);
});

router.get('/view/:id' , util.checkBoardId ,  async (req , res) => {
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    const _id = req.params.id;
    try{
        const board = await BoardService.getBoard(_id);
        result.data = board;
    }catch(err){
        console.log(err);
        result.code = code.success.code;
        result.message = code.success.message;
        result.data = err.message;
        return res.json(result);
    }
    return res.json(result);
})

router.post('/write' , async (req , res) => {
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;

    let board = new Board();
    board.boardType = req.body.boardType;
    board.userEmail = req.body.userEmail;
    board.title = req.body.title;
    board.content = req.body.content;
    board.image = req.body.image;
    try{
        const writeBoard = await BoardService.writeBoard(board);
        if(writeBoard !== 'DR00'){
            result.code = code.fail.code;
            result.message = code.fail.message;
            return res.json(result);
        }
    }catch(err){
        result.code = code.fail.code;
        result.message = code.fail.message;
        result.data = err.message;
        return res.json(result);
    }
    return res.json(result);
});

router.post('/update' , async (req , res) => {
    let board = new Board();
    board = req.body;
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    try{
        const updateBoard = await BoardService.updateBoard(board);
        result.data = updateBoard;
    }catch(err) {
        result.code = code.fail.code;
        result.message = code.fail.message;
        result.data = err.message;
        return res.json(result);
    }
    return res.json(result);
});

router.delete('/delete' , async (req , res) => {
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    let board = new Board();
    board = req.body;
    try{
        const deleteBoard = await BoardService.deleteBoard(board);
        result.data = deleteBoard;
    }catch(err) {
        logger.info(err);
        result.code = code.fail.code;
        result.message = code.fail.message;
        result.data = err.message;
        return res.json(result);
    }
    return res.json(result);
});

router.get('/recent/notice' , async (req , res) => {
    const result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    
    try{
        const recentNotice = await BoardService.getRecentNotice();
        result.data = recentNotice;
    }catch(err){
        logger.info(err.message);
        result.code = code.fail.code;
        result.message = code.fail.message;
        result.data = err.message;
        return res.json(result);
    }
    return res.json(result);
})

module.exports = router;
