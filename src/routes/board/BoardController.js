const express = require('express');
const router = express.Router();
const Board = require('../../models/board');
const Comment = require('../../models/comment');
const ChildComment = require('../../models/childComment');
const common = require('../../common/common');

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


router.get('/list' , (req , res) => {
    // 예시코드  
    const result = {};
    const resJson = common.resJson;
    result.code = 'DR00';
    result.message = common.status.DR00;
    
    Board.find((err , boards) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            resJson.result(result);
            return res.json(resJson);
        } 
        result.data = boards;
        resJson.result(result);
        return res.json(resJson);
    })
})

router.get('/view/:id' , checkBoardId , (req , res) => {
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
            setChildComments(comments);  
        })
    })
})

router.post('/write' , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    let board = new Board();
    board.boardType = req.body.boardType;
    board.userEmail = req.body.userEmail;
    board.title = req.body.title;
    board.content = req.body.content;
    board.image = req.body.image;
    console.log('board:' , board);

    board.save((err) => {
        if(err){
            console.log('err' , err);
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        console.log('result' , common.result);
        return res.json(result);
    })
});

router.put('/update' , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    let board = new Board();
    board = req.body;

    Board.findOneAndUpdate({id:board.id , userEmail:board.userEmail}, (
        {
            title:board.title , 
            content:board.content,
            image:board.image,
            modiDate:board.modiDate
        }) , {new:true} , (err , data) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = status(500).json({err});
            return res.json(result);
        }
        console.log(data);
        result.data = data;
        return res.json(result);
    });
});

router.delete('/delete' , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    let board = new Board();
    board = req.body;
    Board.findOneAndDelete({id:board.id , userEmail:board.userEmail} , {new: true} , (err , data) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = status(500).json({err});
            return res.json(result);
        }
        console.log(data);
        return res.json(result);
    })
});


module.exports = router;

function checkBoardId(req, res, next){ 
    const result = common.result;
    const _id = req.params.id || req.body._id;
    Board.findOne({_id:_id} , (err , boardData) => {
      if(err) {
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = err.message;
        return res.json(result); 
      }
      next();
    });
}