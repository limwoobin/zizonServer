'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Board = require('../../models/board');
var Comment = require('../../models/comment');
var ChildComment = require('../../models/childComment');

var CommentService = {};

CommentService.getSelfComments = function () {
    return new Promise(function (resolve, reject) {
        var board = new Board();
        var data = {};
        board.comment.userEmail = req.params.userEmail;
        Board.comment.findById({ userEmail: board.userEmail }, function (err, comments) {
            if (err) {
                reject(err);
            }
            data.comment = comments;
            Board.childComment.findById({ boardId: comment.parentId }, function (err, childComments) {
                if (err) {
                    reject(err);
                }
                data.comment.childComment = childComments;
            });
            resolve(data);
        });
    });
};

CommentService.writeComment = function (commentData) {
    return new Promise(function (resolve, reject) {
        if (commentData.commentId) {
            var childCommnet = new ChildComment();
            childCommnet.userEmail = commentData.userEmail;
            childCommnet.content = commentData.content;
            childCommnet.board = commentData._id;
            childCommnet.boardType = commentData.boardType;
            childCommnet.commentId = commentData.commentId;
            childCommnet.save(function (err) {
                if (err) {
                    reject(err);
                }
                resolve('success');
            });
        } else {
            var _comment = new Comment();
            _comment.userEmail = commentData.userEmail;
            _comment.content = commentData.content;
            _comment.board = commentData._id;
            _comment.boardType = commentData.boardType;
            _comment.save(function (err) {
                if (err) {
                    reject(err);
                }
                resolve('success');
            });
        }
    });
};

CommentService.getComments = function (id) {
    return new Promise(function (resolve, reject) {
        Comment.find({ board: id }, function (err, comments) {
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
                                    resolve(comments);

                                case 8:
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
            // resolve(comments);
        });
    });
};

module.exports = CommentService;