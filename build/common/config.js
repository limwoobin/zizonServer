'use strict';

// const session = require('express-session');
// const express = require('express');
// const app = express();

var getIpAddressFromRequest = function getIpAddressFromRequest(req) {
    var ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ipAddr;
};

// const sessionConfig = {
//     session : session,
//     sessionUse : function(){
//         app.use(session({
//         secret: 'drogbaSession',
//         resave: false,
//         saveUninitialized: true
//         }));
//     }
// }


module.exports.getIpAddressFromRequest = getIpAddressFromRequest;
// module.exports.sessionConfig = sessionConfig;