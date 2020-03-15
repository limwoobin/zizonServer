'use strict';

var getIpAddressFromRequest = function getIpAddressFromRequest(req) {
    var ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ipAddr;
};

module.exports.getIpAddressFromRequest = getIpAddressFromRequest;