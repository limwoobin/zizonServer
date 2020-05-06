'use strict';

var redis = require('redis');
var redisClient = redis.createClient({ port: port }, { host: host });

redisClient.auth_pass({ password: password }, function (err) {
    if (err) throw err;
});

redisClient.on('error', function (err) {
    console.log('Redis error:' + err);
});

module.exports = redisClient;