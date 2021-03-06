'use strict';

var Board = require('../../models/board');

exports.getBoardList = function (boardType) {
    return new Promise(function (resolve, reject) {
        if (boardType) {
            Board.find({ boardType: boardType }, function (err, categories) {
                if (err) {
                    reject(err);
                }
                resolve(categories);
            });
        } else {
            reject(err);
        }
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

exports.writeBoard = function (board) {
    return new Promise(function (resolve, reject) {
        board.save(function (err) {
            if (err) reject(err);
            resolve('success');
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

exports.getRecentNotice = function () {
    return new Promise(function (resolve, reject) {
        Board.find().where('boardType').equals('notice').sort('-regDate').limit(3).select('_id title').then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    });
};