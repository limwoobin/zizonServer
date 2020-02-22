const getIpAddressFromRequest = (request) => {
    console.log('ip함수');
    let ipAddr = request.connection.remoteAddress;
    if(request.headers && request.headers['x-forwarded-for']){
        [ipAddr] = request.headers['x-forwarded-for'].split(',');
    }
    return ipAddr;
}

module.exports.getIpAddressFromRequest = getIpAddressFromRequest;