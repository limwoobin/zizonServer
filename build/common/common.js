'use strict';

var status = {
    'DRG00': 'SUCCESS',
    'DRG01': 'FAIL',
    'DRG02': 'Empty userEmail',
    'DRG03': 'Empty userPwd',
    'DRG04': 'Empty userNm',
    'DRG05': 'Empty userPhone',
    'DRG06': 'Empty birthday'
};

var result = {};

result.prototype = function (code, message) {
    this.code = code;
    this.message = message;
    this.res = res;
};

var res = {};

module.exports.status = status;
module.exports.result = result;
module.exports.res = res;
// module.exports.RESULT2 = RESULT;