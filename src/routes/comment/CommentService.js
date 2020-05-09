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

CommentService.getComments = (id) => {
    return new Promise((resolve , reject) => {
        Comment.find({board:id} , (err , comments) => {
            if(err){
                reject(err);
            }
            async function setChildComments(comments){
                for(let c in comments){
                    await setChildValue(comments[c]);
                }
                resolve(comments);
            }

            function setChildValue(c){
                return new Promise((resolve , reject) => {
                    ChildComment.find({commentId:c._id} , (err , childComments) => {
                        if(err) reject(err);
                        if(childComments.length !== 0){
                            c.childComments = childComments;
                        }
                        resolve();
                    })
                })
            }
            setChildComments(comments);  
            // resolve(comments);
        })
    });
}

module.exports = CommentService;