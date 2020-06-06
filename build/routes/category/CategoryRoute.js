'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();
var CategoryService = require('./CategoryService');
var common = require('../../common/common');
var logger = require('../../config/winston');

router.get('/list', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var result, categories;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        logger.info('category...');
                        result = common.result;

                        result.code = 'DR00';
                        result.message = common.status.DR00;
                        _context.prev = 4;
                        _context.next = 7;
                        return CategoryService.getCategories();

                    case 7:
                        categories = _context.sent;

                        result.data = categories;
                        _context.next = 17;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](4);

                        result.code = 'DR01';
                        result.message = common.status.DR01;
                        result.data = _context.t0;
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

router.get('/test', function (req, res) {
    req.session.key = req.sessionID;
    console.log('key:' + req.session.key);
    return res.json('aa');
});

module.exports = router;