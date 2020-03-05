const status = {
    DR00: 'SUCCESS',
    DR01: 'FAIL',
    DR02: 'This email does not exist.',
    DR03: 'Password does not match',
};

let Result = {};

let data = {};


Result.prototype = function(code , message , data){
    this.code = code;
    this.message = message;
    this.data = data;
}

module.exports = {
    status : status,
    result : Result,
    data : data
};
