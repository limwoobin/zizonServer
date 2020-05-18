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

exports.getBoard = function(_id){
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
        console.log('notice ㅏ맞나?');
        Board.find()
          .where('boardType').equals('01')
          .sort('-regDate')
          .limit(2)
          .then(data => {
              resolve(data);
          }).catch(err => {
              reject(err);
          })
    })   
}
