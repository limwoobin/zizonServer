'use strict';

var express = require('express');
var router = express.Router();
var Board = require('../../models/board');
var Comment = require('../../models/comment');
var ChildComment = require('../../models/childComment');
var common = require('../../common/common');
var util = require('../../util/util');

router.post('/test', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    var board = new Board();
    board = req.body;
    Board.findOneAndUpdate({ id: board.id, userEmail: board.userEmail }, { content: board.content }, { new: true }, function (err, data) {
        if (err) {
            console.log(err);
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = status(500).json({ err: err });
            return res.json(result);
        }
        console.log(data);
        result.data = data;
        return res.json(result);
    });
});

router.get('/list', function (req, res) {
    // 예시코드  
    var result = {};
    var resJson = common.resJson;
    result.code = 'DR00';
    result.message = common.status.DR00;
    Board.find(function (err, boards) {
        if (err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            resJson.result(result);
            return res.json(resJson);
        }
        result.data = boards;
        resJson.result(result);
        return res.json(resJson);
    });
});

router.get('/view/:id', util.checkBoardId, function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    var _id = req.params.id;
    Board.findOne({ _id: _id }, function (err, boardData) {
        if (err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        boardData.views++;
        boardData.save();
        Comment.find({ board: _id }, function (err, comments) {
            if (err) {
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return res.json(result);
            }

            setChildComments(comments);
            function setChildValue(c) {
                return new Promise(function (resolve, reject) {
                    ChildComment.find({ commentId: c._id }, function (err, childComments) {
                        if (childComments.length !== 0) {
                            c.childComments = childComments;
                        }
                        resolve();
                    });
                });
            }

            async function setChildComments(comments) {
                for (var c in comments) {
                    await setChildValue(comments[c]);
                }
                boardData.comments = comments;
                result.data = boardData;
                return res.json(result);
            }
        });
    });
});

router.post('/write', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    var board = new Board();
    board.boardType = req.body.boardType;
    board.userEmail = req.body.userEmail;
    board.title = req.body.title;
    board.content = req.body.content;
    board.image = req.body.image;
    console.log('board:', board);
    board.save(function (err) {
        if (err) {
            console.log('err', err);
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        console.log('result', common.result);
        return res.json(result);
    });
});

router.put('/update', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    var board = new Board();
    board = req.body;

    Board.findOneAndUpdate({ id: board.id, userEmail: board.userEmail }, {
        title: board.title,
        content: board.content,
        image: board.image,
        modiDate: board.modiDate
    }, { new: true }, function (err, data) {
        if (err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = status(500).json({ err: err });
            return res.json(result);
        }
        console.log(data);
        result.data = data;
        return res.json(result);
    });
});

router.delete('/delete', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    var board = new Board();
    board = req.body;
    Board.findOneAndDelete({ id: board.id, userEmail: board.userEmail }, { new: true }, function (err, data) {
        if (err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = status(500).json({ err: err });
            return res.json(result);
        }
        console.log(data);
        return res.json(result);
    });
});

module.exports = router;