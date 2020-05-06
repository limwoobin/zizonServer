'use strict';

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

module.exports = CommentService;