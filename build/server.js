'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./routes/dbConnection');
var router = require('./routes/router');
var setting = require('./routes/setting');
var expressErrorHandler = require('express-error-handler');
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
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(port + 'port Server Start!!');
});