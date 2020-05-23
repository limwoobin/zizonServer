const status = {
    success: {
        code    : 'DR00',
        message : 'SUCCESS'
    },
    fail: {
        code    : 'DR01',
        message : 'FAIL'
    },
    wrongParam : {
        code    : 'DR02',
        message : 'Wrong Parameter value'
    },
    notLogin : {
        code    : 'DR03',
        message : 'User not logged in'
    }
};


module.exports = status;
