'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./routes/dbConnection');
var router = require('./routes/router');
var setting = require('./routes/setting');
var expressErrorHandler = require('express-error-handler');
var logger = require('./config/winston');
var expressSession = require('express-session');
var visitor = require('./visitor/VisitorFunc');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(db);
app.use(setting);
app.use(expressSession({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});
app.get('/', visitor.visitorCount);
app.use('/', express.static(__dirname + "/../../client/build"));
// 기존 클래스버전

// app.use('/' , express.static(__dirname + "/../../../appHooks/build"));
// 훅스버전

logger.info('logger hello');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/dr', router);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var port = process.env.PORT || 4000;
app.listen(port, function () {
    logger.info('Listening on port ' + port);
});