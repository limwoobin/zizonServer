const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const db = require('./routes/dbConnection');
const router = require('./routes/router');
const setting = require('./routes/setting');
const expressErrorHandler = require('express-error-handler');
const logger = require('./config/winston');
const config = require('./config/config.json');
const session = require('express-session');
// const visitor = require('./visitor/VisitorFunc');
const errorHandler = expressErrorHandler({
    static: {
        '404':'./public/404.html'
    }
});

const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();
const passport = require('passport');
const passportConfig = require('./routes/member/passport');

app.use(session({
    store: new RedisStore({
        host: config.redis.host,
        port: config.redis.port,
        client: client
    }),
    key: config.session.key,
    secret: config.session.secret,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    saveUninitialized: false,
    resave: false
}));



// cors 허용
app.all('/*' , (req , res , next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers' , 'X-Requested-With');
    next();
})

// app.get('/' , visitor.visitorCount);
// 방문자 카운트 미들웨어

app.use(db);
app.use(setting);
app.use(history());
app.use('/' , express.static(__dirname + "/../../../appHooks/build"));
// 훅스버전

app.use(passport.initialize());
app.use(passport.session());
passportConfig();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/dr' , router);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);



const port = process.env.PORT || 4000;
app.listen(port , () => {
    logger.info(`Listening on port ${port}`);
});