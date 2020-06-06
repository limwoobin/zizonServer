'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();
var Member = require('../../models/member');
var MemberService = require('./MemberService');
var common = require('../../common/common');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Result = require('../../common/result');
var code = require('../../common/codeInfo');
var logger = require('../../config/winston');
var util = require('../../util/util');

passport.serializeUser(function (member, done) {
    done(null, member.userEmail);
});

passport.deserializeUser(function (userEmail, done) {
    done(null, userEmail);
});

passport.use('local', new LocalStrategy({
    usernameField: 'userEmail',
    passwordField: 'userPwd',
    session: true
}, function (userEmail, userPwd, done) {
    Member.findOne({ userEmail: userEmail }, function (err, member) {
        if (err) return done(err);
        if (!member) return done(null, false, { message: '존재하지 않는 아이디입니다.' });
        crypto.pbkdf2(userPwd, member.salt, 102391, 64, 'sha512', function (err, key) {
            if (key.toString('base64') === member.userPwd) {
                return done(null, member);
            } else {
                return done(null, false, { message: '비밀번호가 틀렸습니다.' });
            }
        });
    });
}));

router.post('/login', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        result = common.result;

                        result.code = 'DR00';
                        result.message = common.status.DR00;

                        passport.authenticate('local', function (err, member, info) {
                            if (err) {
                                result.code = 'DR01';
                                result.message = common.status.DR01;
                                result.data = err;
                                return res.json(result);
                            }
                            if (!member) {
                                return res.status(401).json(info.message);
                            }
                            req.logIn(member, function (err) {
                                if (err) {
                                    result.code = 'DR01';
                                    result.message = common.status.DR01;
                                    result.data = err;
                                    return next(result);
                                }
                                req.session.key = req.sessionID;
                                result.data = member.userEmail;
                                return res.json(result);
                            });
                        })(req, res, next);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

router.get('/members', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var getMembers;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return MemberService.getMembers();

                    case 3:
                        getMembers = _context2.sent;
                        return _context2.abrupt('return', res.json(getMembers));

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', res.json(_context2.t0));

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}());

router.get('/overlap/check/:userEmail', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var result, member;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        result = common.result;

                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        result.data = null;

                        _context3.prev = 4;

                        console.log(req.params.userEmail);
                        _context3.next = 8;
                        return MemberService.findMember(req.params.userEmail);

                    case 8:
                        member = _context3.sent;

                        console.log('mem:' + member);
                        if (member) {
                            result.code = 'DR01';
                            result.message = common.status.DR01;
                            result.data = member;
                        }
                        _context3.next = 18;
                        break;

                    case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3['catch'](4);

                        result.code = 'DR01';
                        result.message = common.status.DR01;
                        result.data = _context3.t0;

                    case 18:
                        return _context3.abrupt('return', res.json(common.result));

                    case 19:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[4, 13]]);
    }));

    return function (_x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}());

router.post('/insert', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var result, MemberVO, insertMember;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        result = common.result;

                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        result.data = null;

                        MemberVO = new Member(req.body);
                        _context4.prev = 5;
                        _context4.next = 8;
                        return MemberService.insertMember(MemberVO);

                    case 8:
                        insertMember = _context4.sent;

                        console.log('insertMember', insertMember);
                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        _context4.next = 20;
                        break;

                    case 14:
                        _context4.prev = 14;
                        _context4.t0 = _context4['catch'](5);

                        console.log('err', _context4.t0);
                        result.code = 'DR01';
                        result.message = common.status.DR01;
                        result.data = _context4.t0;

                    case 20:
                        return _context4.abrupt('return', res.json(result));

                    case 21:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[5, 14]]);
    }));

    return function (_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}());

router.get('/logout', function (req, res) {
    common.result = {};
    common.result.code = 'DR00';
    common.result.message = common.status.DR00;
    req.logout();
    return res.send(common.result);
});

router.get('/update/info', util.sessionCheck, function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var result, MemberVO, updateMember;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        result = new Result();

                        result.setCode = code.success.code;
                        result.setMessage = code.success.message;

                        _context5.prev = 3;
                        MemberVO = new Member(req.body);
                        _context5.next = 7;
                        return MemberService.updateMember(MemberVO, req.session.userEmail);

                    case 7:
                        updateMember = _context5.sent;

                        result.setData = updateMember;
                        _context5.next = 18;
                        break;

                    case 11:
                        _context5.prev = 11;
                        _context5.t0 = _context5['catch'](3);

                        logger.info(_context5.t0.message);
                        result.setCode = code.fail.code;
                        result.setMessage = code.fail.message;
                        result.setErr = _context5.t0.message;
                        return _context5.abrupt('return', res.json(result));

                    case 18:
                        return _context5.abrupt('return', res.json(result));

                    case 19:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[3, 11]]);
    }));

    return function (_x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}());

module.exports = router;