'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Board = require('../../models/board');
var Comment = require('../../models/comment');
var ChildComment = require('../../models/childComment');

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
    }).then(function (boardData) {
        return new Promise(function (resolve, reject) {
            Comment.find({ board: _id }, function (err, comments) {
                var setChildComments = function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(comments) {
                        var c;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.t0 = regeneratorRuntime.keys(comments);

                                    case 1:
                                        if ((_context.t1 = _context.t0()).done) {
                                            _context.next = 7;
                                            break;
                                        }

                                        c = _context.t1.value;
                                        _context.next = 5;
                                        return setChildValue(comments[c]);

                                    case 5:
                                        _context.next = 1;
                                        break;

                                    case 7:
                                        boardData.comments = comments;
                                        resolve(boardData);

                                    case 9:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));

                    return function setChildComments(_x) {
                        return _ref.apply(this, arguments);
                    };
                }();

                if (err) {
                    reject(err);
                }


                function setChildValue(c) {
                    return new Promise(function (resolve, reject) {
                        ChildComment.find({ commentId: c._id }, function (err, childComments) {
                            if (err) reject(err);
                            if (childComments.length !== 0) {
                                c.childComments = childComments;
                            }
                            resolve();
                        });
                    });
                }
                setChildComments(comments);
            });
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