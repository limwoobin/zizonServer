const Member = require('../../models/member');
const crypto = require('crypto');

const MemberService = {};

MemberService.getMembers = () => {
    return new Promise(function(resolve , reject){
        Member.find((err , members) => {
            if(err){
                reject(err);
            } 
            resolve(members);
        });
    });
}


MemberService.findMember = (userEmail) => {
    return new Promise((resolve , reject) => {
        Member.findOne({userEmail:userEmail} , (err , member) => {
            if(err){
                reject(err);
            }
            resolve(member);
        });        
    })
}

MemberService.insertMember = (memberVO) => {
    return new Promise((resolve , reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err){
                reject(err);
            }
            crypto.pbkdf2(memberVO.userPwd , buf.toString('base64'), 102391, 64, 'sha512', (err, key) => {
                console.log(memberVO);
                memberVO.userPwd = key.toString('base64');
                memberVO.salt = buf.toString('base64');
                memberVO.save((err) => {
                    if(err){
                        reject(err);
                    }
                    resolve('success');
                });
            });
        });
    })
}

module.exports = MemberService;