'use strict';

var express = require('express');
var router = express.Router();
var Board = require('../../models/board');
var Comment = require('../../models/comment');
var ChildComment = require('../../models/childComment');
var common = require('../../common/common');
var util = require('../../util/util');

router.get('/test', function (req, res) {
    result.code = 'DR00';
    result.message = common.status.DR01;
    result.data = 'asd';
    return res.json(result);
});

router.get('/comments/:boardType/:userEmail', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    console.log(req.params.id);
    var board = new Board();
    board.comment.userEmail = req.params.userEmail;
    Board.comment.findById({ userEmail: board.userEmail }, function (err, comments) {
        if (err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        result.data.comment = comments;
        Board.childComment.findById({ boardId: comment.parentId }, function (err, childComments) {
            if (err) {
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);
            }
            result.data.comment.childComment = childComment;
        });
        return res.json(result);
    });
});

router.post('/write', util.checkBoardId, function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.status = common.status.DR00;
    console.log('reqBody', req.body);
    if (req.body.commentId) {
        var childCommnet = new ChildComment();
        childCommnet.userEmail = req.body.userEmail;
        childCommnet.content = req.body.content;
        childCommnet.board = req.body._id;
        childCommnet.boardType = req.body.boardType;
        childCommnet.commentId = req.body.commentId;
        childCommnet.save(function (err) {
            if (err) {
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);
            }
            return res.json(result);
        });
    } else {
        var _comment = new Comment();
        _comment.userEmail = req.body.userEmail;
        _comment.content = req.body.content;
        _comment.board = req.body._id;
        _comment.boardType = req.body.boardType;
        console.log('comment', _comment);
        _comment.save(function (err) {
            if (err) {
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);
            }
            return res.json(result);
        });
    }
});

router.post('/update', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    var board = new Board();
    board = req.body;
    Board.findOneAndUpdate({
        userEmail: board.userEmail,
        id: board.id,
        comment: board.comment
    }, {
        comment: board.comment
    }, { new: true }, function (err, comment) {
        if (err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }

        result.data = comment;
        return res.json(result);
    });
});

module.exports = router;