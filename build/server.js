'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./routes/dbConnection');
var router = require('./routes/router');
var setting = require('./routes/setting');
var expressErrorHandler = require('express-error-handler');
var logger = require('morgan');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(db);
app.use(setting);
app.use('/', express.static(__dirname + "/../../client/build"));
app.use('/dr', router);
console.log('dirname:' + __dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParse.json{limit : '50mb'}));    -- body 크기 설정
// app.use(bodyParser.urlencoded({limit: '50mb' , extended: true})); -- url 크기 설정
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
app.use(logger('dev'));

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(port + 'port Server Start!!');
});