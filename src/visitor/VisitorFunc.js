const visitorCount = (request) => {
    const Visitor = require('../models/visitor');
    const getIp = require('../common/config').getIpAddressFromRequest(request);

    return '좆까이시발';
}


module.exports.visitorCount = visitorCount;