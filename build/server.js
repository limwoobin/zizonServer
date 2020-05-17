'use strict';

var express = require('express');
var app = express();
var history = require('connect-history-api-fallback');
var bodyParser = require('body-parser');
var router = require('./routes/router');
var setting = require('./routes/setting');
var logger = require('./config/winston');
var config = require('./config/config.json');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var client = redis.createClient();
var passport = require('passport');
var compression = require('compression');

app.use(session({
    store: new redisStore({
        host: config.redis.host,
        port: config.redis.port,
        client: client,
        ttl: 200
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

app.use(compression()); // gzip 압축 사용

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
}); // cors 허용

app.use(setting);
app.use(history()); // client와 연결
app.use('/', express.static(__dirname + "/../../../appHooks/build"));
// 훅스버전

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/dr', router);
app.use(function (err, req, res, next) {
    logger.info(err);
    return res.status(500);
});

var port = process.env.PORT || 4000;
app.listen(port, function () {
    logger.info('Listening on port ' + port);
});