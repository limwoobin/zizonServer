const Board = require('../../models/board');
const Comment = require('../../models/comment');
const ChildComment = require('../../models/childComment');

const CommentService = {};

CommentService.getSelfComments = () => {
    return new Promise((resolve , reject) => {
        let board = new Board();
        let data = {};
        board.comment.userEmail = req.params.userEmail;
        Board.comment.findById(({userEmail:board.userEmail}) , (err , comments) => {
            if(err){
                reject(err);
            }
            data.comment = comments;
            Board.childComment.findById({boardId:comment.parentId} , (err , childComments) => {
                if(err){
                    reject(err)
                }
                data.comment.childComment = childComments;
            })
            resolve(data);
        })
    })
}

CommentService.writeComment = (commentData) => {
    return new Promise((resolve , reject) => {
        if(commentData.commentId){
            let childCommnet = new ChildComment();
            childCommnet.userEmail = commentData.userEmail;
            childCommnet.content = commentData.content;
            childCommnet.board = commentData._id;
            childCommnet.boardType = commentData.boardType;
            childCommnet.commentId = commentData.commentId;
            childCommnet.save((err) => {
                if(err){
                    reject(err);
                }
                resolve('success');
            })
        }else{
            let comment = new Comment();
            comment.userEmail = commentData.userEmail;
            comment.content = commentData.content;
            comment.board = commentData._id;
            comment.boardType = commentData.boardType;
            comment.save((err) => {
                if(err){
                    reject(err);
                }
                resolve('success');
            })
        }
    });
}

module.exports = CommentService;