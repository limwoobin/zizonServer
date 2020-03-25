const common = require('../common/common');
const Board = require('../models/board');

function UitlFunc(){

}

UitlFunc.prototype.checkBoardId = function(req , res , next){
  const result = common.result;
  const _id = req.params.id || req.body._id;
  Board.findOne({_id:_id} , (err , boardData) => {
    if(err) {
      result.code = 'DR02';
      result.message = common.status.DR02;
      result.data = err.message;
      return res.json(result); 
    }
    next();
  });
}

const util = new UitlFunc();

module.exports = util;