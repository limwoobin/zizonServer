const redis = require('redis');
const redisClient = redis.createClient({port} , {host});

redisClient.auth_pass({password} , (err) => {
    if(err) throw err;
});

redisClient.on('error' , (err) => {
    console.log('Redis error:' + err);
});

module.exports = redisClient;