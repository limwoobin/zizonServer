'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./config.json');
var logger = require('./winston');
var Member = require('../models/member');
var crypto = require('crypto');
var configFunc = require('./config');

var transporter = nodemailer.createTransport(smtpTransport({
    service: config.mailInfo.service,
    host: config.mailInfo.host,
    auth: {
        user: config.mailInfo.mail,
        pass: config.mailInfo.password
    }
}));

var mailConfig = {};

mailConfig.passwordFindMail = function (toEmail) {
    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var randomPwd, mailOptions;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return configFunc.getRandomString();

                        case 2:
                            randomPwd = _context.sent;
                            mailOptions = {
                                from: config.mailInfo.mail,
                                to: toEmail,
                                subject: 'Drogbalog에서 임시패스워드를 보내드립니다.',
                                text: '\uC784\uC2DC \uD328\uC2A4\uC6CC\uB4DC: ' + randomPwd
                            };


                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err) {
                                    return err;
                                } else {
                                    Member.findOne({ userEmail: toEmail }).then(function (member) {
                                        crypto.pbkdf2(randomPwd, member.salt, 102391, 64, 'sha512', function (err, key) {
                                            if (err) reject(err);
                                            var newPassword = key.toString('base64');
                                            console.log(newPassword);
                                            Member.findOneAndUpdate({ userEmail: toEmail }, { $set: { "userPwd": newPassword } }).then(function (result) {
                                                logger.info(info);
                                                logger.info(result);
                                                resolve('DR00');
                                            });
                                        });
                                    }).catch(function (err) {
                                        logger.info(err);
                                        reject(err);
                                    });
                                }
                            });

                        case 5:
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
};

module.exports = mailConfig;