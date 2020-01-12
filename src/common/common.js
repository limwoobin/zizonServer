const status = {
    'DRG00': 'SUCCESS',
    'DRG01': 'FAIL',
    'DRG02': 'Empty userEmail',
    'DRG03': 'Empty userPwd',
    'DRG04': 'Empty userNm',
    'DRG05': 'Empty userPhone',
    'DRG06': 'Empty birthday'
};

let result = {
    code: '',
    message: ''
};

module.exports.status = status;
module.exports.result = result;