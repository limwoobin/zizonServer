'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var crypto = require('crypto');
var config = require('./config.json');

var getIpAddressFromRequest = function getIpAddressFromRequest(req) {
    var ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ipAddr;
};

var getRandomString = function getRandomString() {
    return new Promise(function (resolve, reject) {
        var _this = this;

        crypto.randomBytes(15, function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, buf) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                // return buf.toString('base64');
                                resolve(buf.toString('base64'));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());
    });
};

var dbInfo = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.dbs;

module.exports.getIpAddressFromRequest = getIpAddressFromRequest;
module.exports.getRandomString = getRandomString;
module.exports.dbInfo = dbInfo;