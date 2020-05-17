'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();
var mailConfig = require('../../config/mailConfig');
var common = require('../../common/common');

router.get('/password/find/:toEmail', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var result, toEmail, sendMail;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        result = common.result;

                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        toEmail = req.params.toEmail;

                        console.log(toEmail);
                        _context.next = 7;
                        return mailConfig.passwordFindMail(toEmail);

                    case 7:
                        sendMail = _context.sent;

                        if (sendMail !== 'DR00') {
                            result.code = 'DR01';
                            result.message = common.status.DR01;
                            result.data = sendMail;
                        }
                        return _context.abrupt('return', res.json(result));

                    case 10:
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

module.exports = router;