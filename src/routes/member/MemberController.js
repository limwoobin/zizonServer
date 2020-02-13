const express = require('express');
const router = express.Router();
const Member = require('../../models/member');
const common = require('../../common/common');
const crypto = require('crypto');
const sessionConfig = require('../../common/config');
// router.use(sessionConfig);

const session = require('express-session');
router.use(session({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true
}));

router.get('/members' , (req , res) => {
    console.log('findAll...');
    Member.find(function(err , members){
        if(err) return res.status(500).send({error:'database fail'});
        res.json(members);
    })
});

router.get('/overlap/check/:userEmail' , (req , res) => {
    console.log('param:' + req.params.userEmail);
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
    // let member = new Member();
    // member.userEmail = req.body.userEmail;
    // member.userPwd = req.body.userPwd;
    // member.birthday = req.body.birthday;
    // member.userNm = req.body.userNm;
    // member.userPhone = req.body.userPhone;
    
    // password encrypt
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

router.post('/login' , (req , res) => {
    console.log('userEmail:' + req.body.userEmail);
    console.log('userPwd:' + req.body.userPwd);
    Member.findOne({userEmail:req.body.userEmail} , (err , member) => {
        if(err) {
            console.log('err:' + err);
            throw err;
        }
        if(!member) {
            common.result.code = 'DR02';
            common.result.message = common.status.DR02;
            res.json(common.result);
            return;
        }else{
            console.log(member);
            console.log('salt:' + member.salt);
            crypto.pbkdf2(req.body.userPwd , member.salt, 102391, 64, 'sha512', (err, key) => {
                if(key.toString('base64') === member.userPwd){
                    // Login Success
                    console.log('Login Success');
                    // sessionConfig.user = req.body.userEmail;
                    // console.log(sessionConfig);
                    req.session.user = req.body.userEmail;
                    console.log(req.session.user);
                    common.result.code = 'DR00';
                    common.result.message = common.status.DR00;
                    res.send(common.result);
                }else{
                    // Login Fail
                    console.log('Fail');
                    common.result.code = 'DR03';
                    common.result.message = common.status.DR03;
                    res.send(common.result);
                }
            });
        }        
    });
    // res.send('좆까');
});


router.get('/logout' , (req , res) => {
    common.result = {};
    console.log(req.session.user);
    if(req.session.user){
        // sessionConfig.destroy((err) => {
        //     if(err) {throw err;}
        // });
        req.session.destroy(function(err){
            if(err) console.log(err);
        });
        console.log('Logout Success');
        common.result.code = 'DR00';
        common.result.message = common.status.DR00;
    }else{
        console.log('Logout Fail');
        common.result.code = 'DR01';
        common.result.message = common.status.DR01;        
    }
    res.send(common.result);
});



module.exports = router;