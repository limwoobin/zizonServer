const Board = require('../../models/board');
const Comment = require('../../models/comment');
const ChildComment = require('../../models/childComment');

module.exports = () => {
    return {
        getList : () => {
            console.log('aaasdasdadasdada');
            return new Promise(function(resolve , reject){
                Board.find((err , categories) => {
                    if(err){
                        reject(err);
                    } 
                    resolve(categories);
                });
            });    
        }
    }
}

exports.getBoardList = function(){
    return new Promise(function(resolve , reject){
        Board.find((err , categories) => {
            if(err){
                reject(err);
            } 
            resolve(categories);
        });
    });
}

exports.getBoard = function(_id){
    return new Promise(function(resolve , reject){
        Board.findOne({_id:_id} , (err , boardData) => {
            if(err){
                reject(err);
            }
            boardData.views++;
            boardData.save();
            resolve(boardData);
        })
    }).then(boardData => {
        return new Promise(function(resolve , reject){
            Comment.find({board:_id} , (err , comments) => {
                if(err){
                    reject(err);
                }
                async function setChildComments(comments){
                    for(let c in comments){
                        await setChildValue(comments[c]);
                    }
                    boardData.comments = comments; 
                    resolve(boardData);
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
            })
        });
    });
}

exports.updateBoard = function(board){
    return new Promise(function(resolve , reject){
        Board.findOneAndUpdate({boardId:board.id , userEmail:board.userEmail}, (
            {
                title:board.title , 
                content:board.content,
                image:board.image,
                modiDate:board.modiDate
            }) , {new:true} , (err , data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    });
}

exports.deleteBoard = function(board){
    return new Promise(function(resolve , reject){
        Board.deleteOne({boardId:board.id , userEmail:board.userEmail} , {new: true} , (err , data) => {
            if(err){
                reject(err.message);
            }
            resolve(data);
        })
    });
}