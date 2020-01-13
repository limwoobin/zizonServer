const express = require('express');
const router = express.Router();
const Member = require('../../models/member');
const common = require('../../common/common');

router.get('/members' , (req , res) => {
    console.log('findAll...');
    Member.find(function(err , members){
        if(err) return res.status(500).send({error:'database fail'});
        res.json(members);
    })
});

router.post('/insert' , (req , res) => {
    console.log(req.body);
    let member = new Member();
    member.userEmail = req.body.userEmail;
    member.userPwd = req.body.userPwd;
    member.birthday = req.body.birthday;
    member.userNm = req.body.userNm;
    member.userPhone = req.body.userPhone;
    member.save((err) => {
        if(err){
            console.error(err);
            common.result.code = 'DRG01';
            common.result.message = common.status.DRG01;
            res.json(common.result);
            return;
        }
        common.result.code = 'DRG00';
        common.result.message = common.status.DRG00;
        res.json(common.result);
    });
});

router.post('/login' , (req , res) => {
    if(req.session.userEmail){

    }else{

    }
});


router.get('/logout' , (req , res) => {
    if(req.session.userEmail){
        console.log('logout...');
        req.session.destroy((err) => {
            if(err) {throw err;}
        });
    }else{
        
    }
});



module.exports = router;