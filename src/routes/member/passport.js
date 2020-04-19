const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../../models/member');

module.exports = () => {
    passport.serializeUser((member , done) => {
        done(null , member);
    });

    passport.deserializeUser((member , done) => {
        done(null , member);
    });

    passport.use(new LocalStrategy({
        userEmailField: 'userEmail',
        passwordField: 'userPwd',
        session: true,
        passReqToCallback: false,
    }, (userEmail , userPwd , done) => {
        Member.findOne({userEmail: userEmail} , (err , member) => {
            if(err) return done(err);
            if(!member) return done(null , false , {message:'존재하지 않는 아이디입니다.'});
            return member.comparePassword(userPwd , (passErr , isMatch) => {
                if(isMatch){
                    return done(null , user); // 검증성공 (암호화 추가 해야함)
                }
                return done(null , false , {message:'비밀번호가 틀렸습니다.'});
            });
        });
    }));
}