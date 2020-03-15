'use strict';

var express = require('express');
var router = express.Router();
var Member = require('../../models/member');
var common = require('../../common/common');
var crypto = require('crypto');

// app.get('redis-store-counter' , (req , res) => {
//     const session = req.session;
//     if(session && session.count){
//         session.count++;
//     }else{
//         session.count = 1;
//     }
//     res.send('count is' + session.count);
// });

router.get('/members', function (req, res) {
    console.log('findAll...');
    Member.find(function (err, members) {
        if (err) return res.status(500).send({ error: 'database fail' });
        res.json(members);
    });
});

router.get('/overlap/check/:userEmail', function (req, res) {
    console.log('param:' + req.params.userEmail);
    common.res = {};
    Member.findOne({ userEmail: req.params.userEmail }, function (err, member) {
        console.log('mem:' + member);
        if (err) {
            console.log('err:' + err);
            throw err;
        }
        if (!member) {
            common.result.code = 'DR00';
            common.result.message = common.status.DR00;
            res.json(common.result);
            return;
        } else {
            common.result.code = 'DR01';
            common.result.message = common.status.DR01;
            common.result.data = member;
            return res.json(common.result);
        }
    });
});

router.post('/insert', function (req, res) {
    console.log(req.body);
    crypto.randomBytes(64, function (err, buf) {
        crypto.pbkdf2(req.body.userPwd, buf.toString('base64'), 102391, 64, 'sha512', function (err, key) {
            var member = new Member();
            console.log(req.body);
            member.userEmail = req.body.userEmail;
            member.userPwd = key.toString('base64');
            member.salt = buf.toString('base64');
            member.birthday = req.body.birthday;
            member.userNm = req.body.userNm;
            member.userPhone = req.body.userPhone;

            member.save(function (err) {
                if (err) {
                    console.error(err);
                    common.result.code = 'DR01';
                    common.result.message = common.status.DR01;
                    res.json(common.result);
                    return;
                }
                common.result.code = 'DR00';
                common.result.message = common.status.DR00;
                console.log(common.result);
                return res.json(common.result);
            });
        });
    });
});

router.post('/login', function (req, res) {
    var rs = req.session;
    console.log('userEmail:' + req.body.userEmail);
    console.log('userPwd:' + req.body.userPwd);
    Member.findOne({ userEmail: req.body.userEmail }, function (err, member) {
        if (err) {
            console.log('err:' + err);
            throw err;
        }
        if (!member) {
            common.result.code = 'DR02';
            common.result.message = common.status.DR02;
            res.json(common.result);
            return;
        } else {
            console.log(member);
            console.log('salt:' + member.salt);
            crypto.pbkdf2(req.body.userPwd, member.salt, 102391, 64, 'sha512', function (err, key) {
                if (key.toString('base64') === member.userPwd) {
                    // Login Success
                    console.log('Login Success');
                    rs.user = req.body.userEmail;
                    console.log(rs);
                    common.result.code = 'DR00';
                    common.result.message = common.status.DR00;
                    res.send(common.result);
                } else {
                    // Login Fail
                    console.log('Fail');
                    common.result.code = 'DR03';
                    common.result.message = common.status.DR03;
                    res.send(common.result);
                }
            });
        }
    });
});

router.get('/logout', function (req, res) {
    common.result = {};
    var rs = req.session;
    console.log(rs.user);
    if (rs.user) {
        rs.destroy(function (err) {
            if (err) {
                throw err;
            }
        });
        console.log('Logout Success');
        common.result.code = 'DR00';
        common.result.message = common.status.DR00;
    } else {
        console.log('Logout Fail');
        common.result.code = 'DR01';
        common.result.message = common.status.DR01;
    }
    res.send(common.result);
});

module.exports = router;