'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var apiRouter = require('./routes/router');

app.use(bodyParser.json());
app.use('/', express.static(__dirname + "/../../client/buiild"));

//const apiRouter = require('./routes/router');
app.use('/api', apiRouter);

var port = 3000;
app.listen(port, function () {
    console.log(port + 'port Server Start!!');
});