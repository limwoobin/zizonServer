'use strict';

var status = {
    DR00: 'SUCCESS',
    DR01: 'FAIL',
    DR02: 'This email does not exist.',
    DR03: 'Password does not match'
};

var Result = {};

Result.prototype = function (code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
};

var data = {};

module.exports = {
    status: status,
    result: Result,
    data: data
};