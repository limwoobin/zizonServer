'use strict';

var common = require('../common/common');
var Board = require('../models/board');
var Post = require('../models/post');

function UtilFunc() {}

UtilFunc.prototype.checkBoardId = function (req, res, next) {
  var result = common.result;
  var _id = req.params.id || req.body._id;
  Board.findOne({ _id: _id }, function (err) {
    if (err) {
      result.code = 'DR02';
      result.message = common.status.DR02;
      result.data = err.message;
      return res.json(result);
    }
    next();
  });
};

UtilFunc.prototype.checkPostId = function (req, res, next) {
  var result = common.result;
  var _id = req.params.id || req.body._id;
  Post.findOne({ _id: _id }, function (err) {
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
  if (!req.user) {
    result.code = 'DR03';
    result.message = common.status.DR03;
    return res.json(result);
  }
  next();
};

UtilFunc.prototype.sessionCheck = function (req, res, next) {
  var result = common.result;
  if (req.session.userEmail || req.session.key) {
    result.code = 'DR01';
    result.message = common.status.DR01;
    return res.json(result);
  }
  next();
};

var util = new UtilFunc();

module.exports = util;