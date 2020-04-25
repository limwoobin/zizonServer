const express = require('express');
const router = express.Router();
const Member = require('../../models/member');
const common = require('../../common/common');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const util = require('../../util/util');

passport.serializeUser((member, done) => {
    done(null, member.userEmail);
});

passport.deserializeUser((userEmail, done) => {
    done(null, userEmail);
});

passport.use('local' , new LocalStrategy({
    usernameField: 'userEmail',
    passwordField: 'userPwd',
    session: true,
}, function(userEmail , userPwd , done) {
    Member.findOne({userEmail: userEmail} , (err , member) => {
        if(err) return done(err);
        if(!member) return done(null , false , {message:'존재하지 않는 아이디입니다.'});
        crypto.pbkdf2(userPwd , member.salt, 102391, 64, 'sha512', (err, key) => {
            if(key.toString('base64') === member.userPwd){
                return done(null , member); 
            }else{
                return done(null , false , {message:'비밀번호가 틀렸습니다.'});
            }
        });
    });
}));

router.post('/login' , (req , res , next) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    passport.authenticate('local' , (err , member , info) => {
        if(err) {
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return res.json(result);
        }
        if(!member) {
            return res.status(401).json(info.message);
        }
        req.logIn(member , (err) => {
            if(err) {
                result.code = 'DR01';
                result.message = common.status.DR01;
                result.data = err;
                return next(result);
            }
            result.data = member.userEmail;
            return res.json(result);
        });
    })(req , res , next);
});

router.get('/loginCheck' , (req ,res) => {
    console.log(req.user);
});

router.get('/members' , (req , res) => {
    console.log('findAll...');
    Member.find(function(err , members){
        if(err) return res.status(500).send({error:'database fail'});
        res.json(members);
    })
});

router.get('/overlap/check/:userEmail' , (req , res) => {
    common.res = {};
    Member.findOne({userEmail:req.params.userEmail} , (err , member) => {
        console.log('mem:' + member);
        if(err) {
            console.log('err:' + err);
            throw err;
        }
        if(!member) {
            common.result.code = 'DR00';
            common.result.message = common.status.DR00;
            res.json(common.result);
            return;
        }else{
            common.result.code = 'DR01';
            common.result.message = common.status.DR01;
            common.result.data = member;
            return res.json(common.result);
        }
    })
});


router.post('/insert' , (req , res) => {
    console.log(req.body);
    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(req.body.userPwd , buf.toString('base64'), 102391, 64, 'sha512', (err, key) => {
            let member = new Member();
            console.log(req.body);
            member.userEmail = req.body.userEmail;
            member.userPwd = key.toString('base64');
            member.salt = buf.toString('base64');
            member.birthday = req.body.birthday;
            member.userNm = req.body.userNm;
            member.userPhone = req.body.userPhone;

            member.save((err) => {
                if(err){
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

router.get('/logout' , (req , res) => {
    common.result = {};
    common.result.code = 'DR00';
    common.result.message = common.status.DR00;

    req.logout();
    return res.send(common.result);
});

module.exports = router;