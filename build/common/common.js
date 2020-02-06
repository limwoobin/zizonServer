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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/master

// -----------------------------------------------

// function Result(code , message , data){
//     this.code = code;
//     this.message = message;
//     this.data = data;
// }

// Result.prototype = new Result();

<<<<<<< HEAD
// module.exports.Result = Result;
=======
// module.exports.RESULT2 = RESULT;
>>>>>>> 082b46d
=======
// module.exports.Result = Result;
>>>>>>> refs/remotes/origin/master
