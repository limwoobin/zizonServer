const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../../models/member');

module.exports = () => {
    passport.serializeUser((member, done) => {
        done(null, member.userEmail); //  user.id가 session(req.session.passport.user)에 저장됨
      });
    
    // 메모리에 한번만 저장
    passport.deserializeUser((userEmail, done) => {
    // 매개변수 id는 req.session.passport.user에 저장된 값

    done(null, userEmail); // req.user에 idr값 저장
    });

    passport.use(new LocalStrategy({
        userEmailField: 'userEmail',
        passwordField: 'userPwd',
    }, (userEmail , userPwd , done) => {
        // Member.findOne({userEmail: userEmail} , (err , member) => {
        //     if(err) return done(err);
        //     if(!member) return done(null , false , {message:'존재하지 않는 아이디입니다.'});
        //     crypto.pbkdf2(userPwd , member.salt, 102391, 64, 'sha512', (err, key) => {
        //         if(key.toString('base64') === member.userPwd){
        //             console.log('pp:' , member.userPwd);
        //             console.log('pp:' , member.salt);
        //             return done(null , user); // 검증성공 (암호화 추가 해야함)
        //         }else{
        //             return done(null , false , {message:'비밀번호가 틀렸습니다.'});
        //         }
        //     });
        // });

        console.log(userEmail);
        console.log(userPwd);
        if('drogba02@naver.com' === userEmail && 'wjqhsaoal22' === userPwd){
            return done(null , {'userEmail':userEmail})
        }else {
            return done(false , null);
        }
    }));
}