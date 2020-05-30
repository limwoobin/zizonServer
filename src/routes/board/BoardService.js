const Board = require('../../models/board');

exports.getBoardList = function(boardType){
    return new Promise(function(resolve , reject){
        if(boardType){
            Board.find({boardType:boardType} , (err , categories) => {
                if(err){
                    reject(err);
                } 
                resolve(categories);
            });
        }else{
            reject(err);
        }
    });
}

exports.getBoard = _id => {
    return new Promise(function(resolve , reject){
        Board.findOne({_id:_id} , (err , boardData) => {
            if(err){
                reject(err);
            }
            boardData.views++;
            boardData.save();
            resolve(boardData);
        });
    });
}

exports.writeBoard = (board) => {
    return new Promise((resolve , reject) => {
        board.save((err) => {
            if(err) reject(err);
            resolve('success');
        })
    })
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

exports.getRecentNotice = () => {
    return new Promise((resolve , reject) => {
        Board.find()
          .where('boardType').equals('notice')
          .sort('-regDate')
          .limit(3)
          .select('_id title')
          .then(data => {
              resolve(data);
          }).catch(err => {
              reject(err);
          })
    })   
}
