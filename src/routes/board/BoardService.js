const Board = require('../../models/board');
const common = require('../../common/common');

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

exports.getBoard = function(){

}

exports.writeBoard = function(boardData){
    return new Promise(function(resolve , reject){
        boardData.save((err) => {
            if(err){
                reject(err);
            }
            resolve('DR00');
        })
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