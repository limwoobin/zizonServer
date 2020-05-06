'use strict';

var Member = require('../../models/member');
var crypto = require('crypto');

var MemberService = {};

MemberService.getMembers = function () {
    return new Promise(function (resolve, reject) {
        Member.find(function (err, members) {
            if (err) {
                reject(err);
            }
            resolve(members);
        });
    });
};

MemberService.findMember = function (userEmail) {
    return new Promise(function (resolve, reject) {
        Member.findOne({ userEmail: userEmail }, function (err, member) {
            if (err) {
                reject(err);
            }
            resolve(member);
        });
    });
};

MemberService.insertMember = function (memberVO) {
    return new Promise(function (resolve, reject) {
        crypto.randomBytes(64, function (err, buf) {
            if (err) {
                reject(err);
            }
            crypto.pbkdf2(memberVO.userPwd, buf.toString('base64'), 102391, 64, 'sha512', function (err, key) {
                console.log(memberVO);
                memberVO.userPwd = key.toString('base64');
                memberVO.salt = buf.toString('base64');
                memberVO.save(function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve('success');
                });
            });
        });
    });
};

module.exports = MemberService;