'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express();
var PostService = require('./PostService');
var code = require('../../common/codeInfo');
var Result = require('../../common/result');
var util = require('../../util/util');
var logger = require('../../config/winston');

router.get('/list/:postType', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var result, postType, posts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;
                        postType = req.params.postType;
                        _context.prev = 4;
                        _context.next = 7;
                        return PostService.getPosts(postType);

                    case 7:
                        posts = _context.sent;

                        result.data = posts;
                        _context.next = 18;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](4);

                        logger.debug(_context.t0.message);
                        result.setCode = code.fail.code;
                        result.setMessage = code.fail.message;
                        result.setData = _context.t0.message;
                        return _context.abrupt('return', res.json(result));

                    case 18:
                        return _context.abrupt('return', res.json(result));

                    case 19:
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

router.get('/view/:id', util.checkPostId, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var result, postId, post;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;
                        postId = req.params.postId;
                        _context2.prev = 4;
                        _context2.next = 7;
                        return PostService.getPost(postId);

                    case 7:
                        post = _context2.sent;

                        result.setData = post;
                        _context2.next = 18;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](4);

                        logger.debug(_context2.t0.message);
                        result.setCode = code.fail.code;
                        result.setMessage = code.fail.message;
                        result.setData = _context2.t0.message;
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

router.get('/recent/posts', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var result, recentPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;

                        _context3.prev = 3;
                        _context3.next = 6;
                        return PostService.getRecentPosts();

                    case 6:
                        recentPost = _context3.sent;

                        result.setData = recentPost;
                        _context3.next = 16;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3['catch'](3);

                        result.setCode = code.fail.code;
                        result.setMessage = code.fail.message;
                        result.setErr = _context3.t0.message;
                        return _context3.abrupt('return', res.json(result));

                    case 16:
                        return _context3.abrupt('return', res.json(result));

                    case 17:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[3, 10]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

router.get('/write', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var writePost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return PostService.WritePost(req.body);

                    case 2:
                        writePost = _context4.sent;
                        return _context4.abrupt('return', res.json(writePost));

                    case 4:
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

module.exports = router;