const express = require('express');
const router = express.Router();
const Member = require('../../models/member');
const common = require('../../common/common');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


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

router.post('/login', passport.authenticate('local', 
{
    failureRedirect: '/login', 
    failureFlash: true
}), 
    (req, res) => {
        console.log(req.body);
    return res.send('success~~');
  });

// router.post('/login' , (req , res) => {
//     const rs = req.session;
//     console.log('userEmail:' + req.body.userEmail);
//     console.log('userPwd:' + req.body.userPwd);
//     Member.findOne({userEmail:req.body.userEmail} , (err , member) => {
//         if(err) {
//             console.log('err:' + err);
//             throw err;
//         }
//         if(!member) {
//             common.result.code = 'DR02';
//             common.result.message = common.status.DR02;
//             res.json(common.result);
//             return;
//         }else{
//             crypto.pbkdf2(req.body.userPwd , member.salt, 102391, 64, 'sha512', (err, key) => {
//                 if(key.toString('base64') === member.userPwd){
//                     // Login Success
//                     console.log('Login Success');
//                     rs.user = req.body.userEmail;
//                     common.result.code = 'DR00';
//                     common.result.message = common.status.DR00;
//                     return res.send(common.result);
//                 }else{
//                     // Login Fail
//                     console.log('Fail');
//                     common.result.code = 'DR03';
//                     common.result.message = common.status.DR03;
//                     return res.send(common.result);
//                 }
//             });
//         }        
//     });
// });


router.post('/passportTest' , passport.authenticate('local' , {
    failureRedirect : '/'
}) , (req , res) => {
    common.result = {};
    common.result.code = 'DR00';
    common.result.message = common.status.DR00;
    return res.send(common.result);
});

router.get('/logout' , (req , res) => {
    common.result = {};
    const rs = req.session;
    if(rs.user){
        delete rs.user;
        console.log('Logout Success');
        common.result.code = 'DR00';
        common.result.message = common.status.DR00;
    }else{
        console.log('Logout Fail');
        common.result.code = 'DR01';
        common.result.message = common.status.DR01;        
    }
    return res.send(common.result);
});



module.exports = router;