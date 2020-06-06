'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();
var BoardService = require('./BoardService');
var Board = require('../../models/board');
var common = require('../../common/common');
var util = require('../../util/util');
var Result = require('../../common/result');
var code = require('../../common/codeInfo');

router.post('/test', function (req, res) {
    var result = new Result();
    result.setCode = code.success.code;
    result.setMessage = code.success.message;
    var board = new Board();
    board = req.body;
    Board.findOneAndUpdate({ id: board.id, userEmail: board.userEmail }, { content: board.content }, { new: true }, function (err, data) {
        if (err) {
            console.log(err);
            result.code = code.fail.code;
            result.message = code.fail.message;
            result.data = status(500).json({ err: err });
            return res.json(result);
        }
        console.log(data);
        result.data = data;
        return res.json(result);
    });
});

router.get('/list/:type', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var result, boardType, boards;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // 예시코드  
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;
                        boardType = req.params.type;
                        _context.prev = 4;
                        _context.next = 7;
                        return BoardService.getBoardList(boardType);

                    case 7:
                        boards = _context.sent;

                        result.data = boards;
                        _context.next = 17;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](4);

                        result.code = code.fail.code;
                        result.message = code.fail.message;
                        result.data = _context.t0.message;
                        return _context.abrupt('return', res.json(result));

                    case 17:
                        return _context.abrupt('return', res.json(result));

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[4, 11]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

router.get('/view/:id', util.checkBoardId, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var result, _id, board;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;
                        _id = req.params.id;
                        _context2.prev = 4;
                        _context2.next = 7;
                        return BoardService.getBoard(_id);

                    case 7:
                        board = _context2.sent;

                        result.data = board;
                        _context2.next = 18;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](4);

                        console.log(_context2.t0);
                        result.code = code.success.code;
                        result.message = code.success.message;
                        result.data = _context2.t0.message;
                        return _context2.abrupt('return', res.json(result));

                    case 18:
                        return _context2.abrupt('return', res.json(result));

                    case 19:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[4, 11]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

router.post('/write', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var result, board, writeBoard;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;

                        board = new Board();

                        board.boardType = req.body.boardType;
                        board.userEmail = req.body.userEmail;
                        board.title = req.body.title;
                        board.content = req.body.content;
                        board.image = req.body.image;
                        _context3.prev = 9;
                        _context3.next = 12;
                        return BoardService.writeBoard(board);

                    case 12:
                        writeBoard = _context3.sent;

                        if (!(writeBoard !== 'success')) {
                            _context3.next = 17;
                            break;
                        }

                        result.code = code.fail.code;
                        result.message = code.fail.message;
                        return _context3.abrupt('return', res.json(result));

                    case 17:
                        _context3.next = 25;
                        break;

                    case 19:
                        _context3.prev = 19;
                        _context3.t0 = _context3['catch'](9);

                        result.code = code.fail.code;
                        result.message = code.fail.message;
                        result.data = _context3.t0.message;
                        return _context3.abrupt('return', res.json(result));

                    case 25:
                        return _context3.abrupt('return', res.json(result));

                    case 26:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[9, 19]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

router.post('/update', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var board, result, updateBoard;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        board = new Board();

                        board = req.body;
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;
                        _context4.prev = 5;
                        _context4.next = 8;
                        return BoardService.updateBoard(board);

                    case 8:
                        updateBoard = _context4.sent;

                        result.data = updateBoard;
                        _context4.next = 18;
                        break;

                    case 12:
                        _context4.prev = 12;
                        _context4.t0 = _context4['catch'](5);

                        result.code = code.fail.code;
                        result.message = code.fail.message;
                        result.data = _context4.t0.message;
                        return _context4.abrupt('return', res.json(result));

                    case 18:
                        return _context4.abrupt('return', res.json(result));

                    case 19:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[5, 12]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

router.delete('/delete', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var result, board, deleteBoard;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;
                        board = new Board();

                        board = req.body;
                        _context5.prev = 5;
                        _context5.next = 8;
                        return BoardService.deleteBoard(board);

                    case 8:
                        deleteBoard = _context5.sent;

                        result.data = deleteBoard;
                        _context5.next = 19;
                        break;

                    case 12:
                        _context5.prev = 12;
                        _context5.t0 = _context5['catch'](5);

                        logger.info(_context5.t0);
                        result.code = code.fail.code;
                        result.message = code.fail.message;
                        result.data = _context5.t0.message;
                        return _context5.abrupt('return', res.json(result));

                    case 19:
                        return _context5.abrupt('return', res.json(result));

                    case 20:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[5, 12]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());

router.get('/recent/notice', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var result, recentNotice;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;

                        _context6.prev = 3;
                        _context6.next = 6;
                        return BoardService.getRecentNotice();

                    case 6:
                        recentNotice = _context6.sent;

                        result.setData = recentNotice;
                        _context6.next = 17;
                        break;

                    case 10:
                        _context6.prev = 10;
                        _context6.t0 = _context6['catch'](3);

                        logger.info(_context6.t0.message);
                        result.code = code.fail.code;
                        result.message = code.fail.message;
                        result.data = _context6.t0.message;
                        return _context6.abrupt('return', res.json(result));

                    case 17:
                        return _context6.abrupt('return', res.json(result));

                    case 18:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[3, 10]]);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());

module.exports = router;