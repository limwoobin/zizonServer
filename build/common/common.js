'use strict';

var status = {
    DR00: 'SUCCESS',
    DR01: 'FAIL',
    DR02: 'This email does not exist.',
    DR03: 'Password does not match'
};

var result = {};

result.prototype = function (code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
};

var data = {};

module.exports.status = status;
module.exports.result = result;
module.exports.data = data;

// -----------------------------------------------

// function Result(code , message , data){
//     this.code = code;
//     this.message = message;
//     this.data = data;
// }

// Result.prototype = new Result();

// module.exports.Result = Result;