const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const db = require('./routes/dbConnection');
const router = require('./routes/router');
const setting = require('./routes/setting');
const logger = require('./config/winston');
const config = require('./config/config.json');
const session = require('express-session');
// const visitor = require('./visitor/VisitorFunc');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
const passport = require('passport')
const compression = require('compression');


app.use(session({
    store: new redisStore({
        host: config.redis.host,
        port: config.redis.port,
        client: client,
        ttl:200
    }),
    key: config.session.key,
    secret: config.session.secret,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(compression());

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/dr' , router);
app.use((err , req , res , next) => {
    logger.info(err);
    return res.status(500);
})

const port = process.env.PORT || 4000;
app.listen(port , () => {
    logger.info(`Listening on port ${port}`);
});