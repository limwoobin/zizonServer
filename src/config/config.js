const getIpAddressFromRequest = (req) => {
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ipAddr;
}


module.exports.getIpAddressFromRequest = getIpAddressFromRequest;