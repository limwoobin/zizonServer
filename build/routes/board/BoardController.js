'use strict';

var express = require('express');
var router = express.Router();
var Board = require('../../models/board');
var common = require('../../common/common');

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
    });
    return res.json(resJson);
});

router.get('/view/:id', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    Board.findOne({ id: req.params.id }, function (err, boardData) {
        if (err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        result.data = boardData;
        return res.json(result);
    });
});

router.post('/write', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    var board = new Board();
    board = req.body;
    if (board.id) delete board.id;
    console.log('board:', board);

    board.save(function (err) {
        if (err) {
            console.log('err', err);
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = status(500).json({ err: err });
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

router.post('/comment/add', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.status = common.status.DR00;
    var comment = Comment();
    comment = req.body;
    comment.save(function (err) {
        if (err) {
            result.code = 'DR01';
            result.status = common.status.DR01;
            result.data = err;
            return res.json(result);
        }

        result.data = comment;
        return res.json(result);
    });
});

router.post('/comment/update', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    var comment = Comment();
    comment = req.body;
    Comment.findOneAndUpdate({
        parentId: comment.parentId,
        parentType: comment.parentType,
        userEmail: comment.userEmail,
        id: comment.id
    }, {
        content: comment.content,
        image: comment.image,
        modiDate: comment.modiDate
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