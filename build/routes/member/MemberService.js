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

MemberService.insertMember = function (MemberVO) {
    return new Promise(function (resolve, reject) {
        crypto.randomBytes(64, function (err, buf) {
            if (err) {
                reject(err);
            }
            crypto.pbkdf2(MemberVO.userPwd, buf.toString('base64'), 102391, 64, 'sha512', function (err, key) {
                console.log(MemberVO);
                MemberVO.userPwd = key.toString('base64');
                MemberVO.salt = buf.toString('base64');
                MemberVO.save(function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve('success');
                });
            });
        });
    });
};

MemberService.updateMember = function (MemberVO, userEmail) {
    return new Promise(function (resolve, reject) {
        if (MemberVO.userEmail !== userEmail) {
            reject('사용자의 세션이 만료되었습니다.');
        }
        Member.findOne({ userEmail: MemberVO.userEmail }).then(function (member) {
            crypto.pbkdf2(MemberVO.userPwd, member.salt, 102391, 64, 'sha512', function (err, key) {
                if (err) reject(err);
                var newPassword = key.toString('base64');
                console.log(newPassword);
                Member.findOneAndUpdate({ userEmail: Member.userEmail }, { $set: { "userPwd": newPassword } }).then(function (result) {
                    logger.info(info);
                    logger.info(result);
                    resolve('success');
                });
            });
        }).catch(function (err) {
            logger.info(err);
            reject(err);
        });
    });
};

module.exports = MemberService;