const crypto = require('crypto');

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

module.exports.getIpAddressFromRequest = getIpAddressFromRequest;
module.exports.getRandomString = getRandomString;