'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();
var CommentService = require('./CommentService');
var Board = require('../../models/board');
var common = require('../../common/common');
var util = require('../../util/util');

router.get('/test', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        result.code = 'DR00';
                        result.message = common.status.DR01;
                        result.data = 'asd';
                        return _context.abrupt('return', res.json(result));

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

router.get('/comments/:boardType/:userEmail', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var result, getSelfComments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        result = common.result;

                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        console.log(req.params.id);
                        _context2.prev = 4;
                        getSelfComments = CommentService.getSelfComments(req.params.userEmail);

                        result.data = getSelfComments;
                        _context2.next = 15;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](4);

                        result.code = 'DR01';
                        result.message = common.status.DR01;
                        result.data = _context2.t0;
                        return _context2.abrupt('return', res.json(result));

                    case 15:
                        return _context2.abrupt('return', res.json(result));

                    case 16:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[4, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

router.post('/write', util.checkBoardId, function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var result, writeComment;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log(req.body);
                        result = common.result;

                        result.code = 'DR00';
                        result.status = common.status.DR00;
                        _context3.prev = 4;
                        _context3.next = 7;
                        return CommentService.writeComment(req.body);

                    case 7:
                        writeComment = _context3.sent;

                        console.log('writeComment', writeComment);
                        _context3.next = 18;
                        break;

                    case 11:
                        _context3.prev = 11;
                        _context3.t0 = _context3['catch'](4);

                        console.log(_context3.t0);
                        result.code = 'DR01';
                        result.status = common.status.DR01;
                        result.data = _context3.t0;
                        return _context3.abrupt('return', res.json(result));

                    case 18:
                        return _context3.abrupt('return', res.json(result));

                    case 19:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[4, 11]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

router.post('/update', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var result, board;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        result = common.result;

                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        board = new Board();

                        board = req.body;
                        Board.findOneAndUpdate({
                            userEmail: board.userEmail,
                            id: board.id,
                            comment: board.comment
                        }, {
                            comment: board.comment
                        }, { new: true }, function (err, comment) {
                            if (err) {
                                result.code = 'DR01';
                                result.message = common.status.DR01;
                                result.data = err;
                                return res.json(result);
                            }

                            result.data = comment;
                            return res.json(result);
                        });

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

router.get('/list/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var result, comments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        result = common.result;

                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        console.log(req.params.id);

                        _context5.prev = 4;
                        _context5.next = 7;
                        return CommentService.getComments(req.params.id);

                    case 7:
                        comments = _context5.sent;

                        result.data = comments;
                        _context5.next = 17;
                        break;

                    case 11:
                        _context5.prev = 11;
                        _context5.t0 = _context5['catch'](4);

                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        result.data = _context5.t0;
                        return _context5.abrupt('return', res.json(result));

                    case 17:
                        return _context5.abrupt('return', res.json(result));

                    case 18:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[4, 11]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());

module.exports = router;