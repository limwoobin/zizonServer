const express = require('express');
const router = express.Router();
const Member = require('../../models/member');
const common = require('../../common/common');
const crypto = require('crypto');
const session = require('express-session');
// const RedisStore = require('connect-redis')(session);

router.use(session({
    // store: new RedisStore({}),
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true
}));

// app.get('redis-store-counter' , (req , res) => {
//     const session = req.session;
//     if(session && session.count){
//         session.count++;
//     }else{
//         session.count = 1;
//     }
//     res.send('count is' + session.count);
// });

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
    const rs = req.session;
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
                    rs.user = req.body.userEmail;
                    console.log(rs);
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

});


router.get('/logout' , (req , res) => {
    common.result = {};
    const rs = req.session;
    console.log(rs.user);
    if(rs.user){
        rs.destroy((err) => {
            if(err) {throw err;}
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