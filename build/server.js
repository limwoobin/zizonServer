'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./routes/dbConnection');
var router = require('./routes/router');
var setting = require('./routes/setting');

app.use(db);
app.use(setting);
app.use('/', express.static(__dirname + "/../../client/build"));
app.use('/dr', router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test', function (req, res) {
    var name = req.body.name;
    res.send(name);
});

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(port + 'port Server Start!!');
});