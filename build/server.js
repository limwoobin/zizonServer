'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./routes/dbConnection');
var router = require('./routes/router');
var setting = require('./routes/setting');
var expressErrorHandler = require('express-error-handler');
var logger = require('morgan');
var expressSession = require('express-session');
// const visitorCount = require('./visitor/VisitorFunc').visitorCount;

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(db);
app.use(setting);
// 방문객 카운터 미들웨어
// app.get('/' , (req , res , next) => {
//     console.log('middleware');
//     visitorCount(req);
//     next();
// });
app.use(expressSession({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

app.use(function (req, res, next) {
    console.log('request URL:' + req.url);
    next();
});
app.use('/', express.static(__dirname + "/../../client/build"));
app.use('/dr', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
app.use(logger('local'));

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(port + 'port Server Start!!');
});