'use strict';

var crypto = require('crypto');

var aaa = crypto.randomBytes(15, function (err, buf) {
    console.log(buf.toString('base64'));
});

aaa;