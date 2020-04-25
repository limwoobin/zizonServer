const status = {
    DR00: 'SUCCESS',
    DR01: 'FAIL',
    DR02: '잘못된 파라미터 값',
    DR03: '로그인되지 않은 사용자',
};

let Result = {
    
};

function Response(){};

Response.prototype.result = function(obj){
    this.code = obj.code;
    this.message = obj.message;
    this.data = obj.data;
}

const response = new Response();

module.exports = {
    status : status,
    result : Result,
    resJson : response,
};
