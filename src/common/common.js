const status = {
    DR00: 'SUCCESS',
    DR01: 'FAIL',
    DR02: 'This email does not exist.',
    DR03: 'Password does not match',
};

let Result = {
    
};

const state = {
    // DR00 : 'DR00',
}


function State(){};
State.prototype.DR00 = 'SUCCESS';
State.prototype.DR01 = 'FAIL';
State.prototype.DR02 = 'This email does not exist.';
State.prototype.DR03 = 'Password does not match';

const resState = new State();

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
    resState : resState,
};
