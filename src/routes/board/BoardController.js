const express = require('express');
const router = express.Router();
const Board = require('../../models/board');
const common = require('../../common/common');

const result = common.result;

router.post('/test' , (req , res) => {
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
    result.code = 'DR00';
    result.message = common.status.DR00;
    
    Board.find((err , boards) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return result;
        } 
        result.data = boards;
    })
    return res.json(result);
})

router.get('/view/:id' , (req , res) => {
    result.code = 'DR00';
    result.message = common.status.DR00;
    Board.findOne({id:req.params.id} , (err , boardData) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        result.data = boardData;
        return res.json(result);
    })
})

router.post('/add' , (req , res) => {
    result.code = 'DR00';
    result.message = common.status.DR00;
    console.log(req.body);
    let board = new Board();
    board = req.body;

    board.save((err) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = status(500).json({err});
            return res.json(result);
        }
        console.log(common.result);
        return res.json(result);
    })
});

router.put('/update' , (req , res) => {
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


router.post('/comment/add' , (req , res) => {
    result.code = 'DR00';
    result.status = common.status.DR00;
    let comment = Comment();
    comment = req.body;
    comment.save((err) => {
        if(err){
            result.code = 'DR01';
            result.status = common.status.DR01;
            result.data = err;
            return res.json(result);
        }

        result.data = comment;
        return res.json(result);
    });
})

router.post('/comment/update' , (req , res) => {
    result.code = 'DR00';
    result.message = common.status.DR00;
    let comment = Comment();
    comment = req.body;
    Comment.findOneAndUpdate(
        {
            parentId: comment.parentId, 
            parentType: comment.parentType,
            userEmail: comment.userEmail,
            id: comment.id,
        } , 
        {
            content: comment.content,
            image: comment.image,
            modiDate: comment.modiDate,
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