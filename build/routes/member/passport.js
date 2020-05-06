'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Member = require('../../models/member');

module.exports = function () {
    passport.serializeUser(function (member, done) {

        done(null, member.userEmail);
    });

    passport.deserializeUser(function (userEmail, done) {

        done(null, userEmail);
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'userEmail',
        passwordField: 'userPwd'
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
};