'use strict';

var common = require('../common/common');
var Board = require('../models/board');

function UtilFunc() {}

UtilFunc.prototype.checkBoardId = function (req, res, next) {
  var result = common.result;
  var _id = req.params.id || req.body._id;
  Board.findOne({ _id: _id }, function (err, boardData) {
    if (err) {
      result.code = 'DR02';
      result.message = common.status.DR02;
      result.data = err.message;
      return res.json(result);
    }
    next();
  });
};

UtilFunc.prototype.isLogged = function (req, res, next) {
  var result = common.result;
  var rs = req.session;
  var userEmail = req.body.userEmail || req.params.userEmail;
  if (!rs.userEmail) {
    result.code = 'DR03';
    result.message = common.status.DR03;
    return res.json(result);
  }
  next();
};

var util = new UtilFunc();

module.exports = util;