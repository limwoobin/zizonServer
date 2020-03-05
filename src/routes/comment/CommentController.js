const express = require('express');
const router = express.Router();
const Comment = require('../../models/comment');
const ChildComment = require('../../models/childComment');
const common = require('../../common/common');

const result = common.result;

router.get('/test' , (req , res) => {
    result.code = 'DR00';
    result.message = common.status.DR01;
    result.data = 'asd';
    return res.json(result);
})

router.get('/comments/:id' , (req , res) => {
    result.code = 'DR00';
    result.message = common.status.DR00;
    console.log(req.params.id);
    let comment = new Comment();
    comment.parentId = req.params.id;
    Comment.findById(({parentId:comment.parentId}) , (err , comments) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        result.data.comment = comments;
        ChildComment.findById({boardId:comment.parentId} , (err , childComments) => {
            if(err){
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);
            }
            result.data.comment.id = childComment;
        })
        return res.json(result);
    })
})

router.post('/add' , (req , res) => {
    result.code = 'DR00';
    result.status = common.status.DR00;
    let comment = Comment();
    comment = req.body;
    comment.save((err , comments) => {
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

router.post('/update' , (req , res) => {
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
