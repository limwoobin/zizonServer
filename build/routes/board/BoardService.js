'use strict';

var Board = require('../../models/board');

exports.getBoardList = function () {
    return new Promise(function (resolve, reject) {
        Board.find(function (err, categories) {
            if (err) {
                reject(err);
            }
            resolve(categories);
        });
    });
};

exports.getBoard = function (_id) {
    return new Promise(function (resolve, reject) {
        Board.findOne({ _id: _id }, function (err, boardData) {
            if (err) {
                reject(err);
            }
            boardData.views++;
            boardData.save();
            resolve(boardData);
        });
    });
};

exports.updateBoard = function (board) {
    return new Promise(function (resolve, reject) {
        Board.findOneAndUpdate({ boardId: board.id, userEmail: board.userEmail }, {
            title: board.title,
            content: board.content,
            image: board.image,
            modiDate: board.modiDate
        }, { new: true }, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.deleteBoard = function (board) {
    return new Promise(function (resolve, reject) {
        Board.deleteOne({ boardId: board.id, userEmail: board.userEmail }, { new: true }, function (err, data) {
            if (err) {
                reject(err.message);
            }
            resolve(data);
        });
    });
};