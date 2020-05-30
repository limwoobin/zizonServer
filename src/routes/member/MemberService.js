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

MemberService.insertMember = (MemberVO) => {
    return new Promise((resolve , reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err){
                reject(err);
            }
            crypto.pbkdf2(MemberVO.userPwd , buf.toString('base64'), 102391, 64, 'sha512', (err, key) => {
                console.log(MemberVO);
                MemberVO.userPwd = key.toString('base64');
                MemberVO.salt = buf.toString('base64');
                MemberVO.save((err) => {
                    if(err){
                        reject(err);
                    }
                    resolve('success');
                });
            });
        });
    })
}

MemberService.updateMember = (MemberVO , userEmail) => {
    return new Promise((resolve , reject) => {
        if(MemberVO.userEmail !== userEmail) {
            reject('사용자의 세션이 만료되었습니다.');
        }
        Member.findOne({userEmail: MemberVO.userEmail})
            .then(member => {
                crypto.pbkdf2(MemberVO.userPwd , member.salt, 102391, 64, 'sha512', (err, key) => {
                    if(err) reject(err);
                        let newPassword = key.toString('base64');
                        console.log(newPassword);
                        Member.findOneAndUpdate({userEmail: Member.userEmail}, 
                            {$set : {"userPwd": newPassword}})
                        .then((result) => {
                            logger.info(info);
                            logger.info(result);
                            resolve('success');
                        })
                    });
                })
                .catch(err => {
                    logger.info(err);
                    reject(err);
                });
    });
}

module.exports = MemberService;