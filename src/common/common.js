const status = {
    DR00: 'SUCCESS',
    DR01: 'FAIL',
    DR02: 'This email does not exist.',
    DR03: 'Password does not match',
};

let result = {
    
    
};

result.prototype = function(code , message , data){
    this.code = code;
    this.message = message;
    this.data = data;
}

let data = {

}

module.exports.status = status;
module.exports.result = result;
module.exports.data = data;
// module.exports.RESULT2 = RESULT;
