// const sha256 = require('sha256');
// let password = '111';
// let salt='asd';
// const securePassword = sha256(password+salt);

// console.log(securePassword);


// PBKDF2 - secure password
var pbkdf2Password = require('pbkdf2-password');
var hasher = pbkdf2Password();

router.get('/regist', function (req, res) {
    res.render('regist', { title: '36.5 Arts' });
});

router.post('/regist', function (req, res) {

    hasher({password: req.body.password}, function (err, pass, salt, hash) {
        var user = new User();
        user.email = req.body.email;
        user.password = hash;
        user.salt = salt;
        user.type = req.body.type;
        user.major = req.body.major;

        user.save(function (err) {
            if(err){
                console.log(err);
                res.redirect('/');
            }
            req.session.email = user.email;
            res.redirect('/');
        })
    });
});