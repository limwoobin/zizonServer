'use strict';

var express = require('express');
var router = express.Router();
var Board = require('../../models/board');
var common = require('../../common/common');

var result = common.result;

router.get('/test', function (req, res) {
    result.code = 'DR00';
    result.message = common.status.DR01;
    result.data = 'asd';
    return res.json(result);
});

router.get('/comments/:boardType/:userEmail', function (req, res) {
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

router.post('/add', function (req, res) {
    result.code = 'DR00';
    result.status = common.status.DR00;
    var board = new Board();
    board = req.body.id;
    board.save({ id: board.id, comment: req.body.comment }, function (req, res) {});
});

router.post('/update', function (req, res) {
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