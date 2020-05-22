const crypto = require('crypto');
const config = require('./config.json');

const getIpAddressFromRequest = (req) => {
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ipAddr;
}

const getRandomString = () => {
    return new Promise(function(resolve , reject){
        crypto.randomBytes(15, async (err, buf) => {
            // return buf.toString('base64');
            resolve(buf.toString('base64'));
        });
    });
}

const dbInfo = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbs}`;

module.exports.getIpAddressFromRequest = getIpAddressFromRequest;
module.exports.getRandomString = getRandomString;
module.exports.dbInfo = dbInfo;