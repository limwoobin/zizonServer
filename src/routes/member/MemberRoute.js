const express = require('express');
const router = express.Router();
const Member = require('../../models/member');
const MemberService = require('./MemberService');
const common = require('../../common/common');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

router.post('/login' , async (req , res , next) => {
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
            req.session.key = req.sessionID;
            result.data = member.userEmail;
            return res.json(result);
        });
    })(req , res , next);
});

router.get('/members' , async (req , res) => {
    try{
        const getMembers = await MemberService.getMembers();
        return res.json(getMembers);
    }catch(err){
        return res.json(err);
    }
});

router.get('/overlap/check/:userEmail' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    result.data = null;

    try{
        console.log(req.params.userEmail);
        const member = await MemberService.findMember(req.params.userEmail);
        console.log('mem:' + member);
        if(member){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = member;
        }
    }catch(err){
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = err;
    }
    return res.json(common.result);
});


router.post('/insert' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    result.data = null;
    
    let memberVO = new Member(req.body);

    try{
        const insertMember = await MemberService.insertMember(memberVO);
        console.log('insertMember' , insertMember);
        result.code = 'DR00';
        result.message = common.status.DR00;
    }catch(err){
        console.log('err' , err);
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = err;
    }

    return res.json(result);
});

router.get('/logout' , (req , res) => {
    common.result = {};
    common.result.code = 'DR00';
    common.result.message = common.status.DR00;
    req.logout();
    return res.send(common.result);
});

module.exports = router;